<?php

namespace App\Services;

use App\Models\PokemonCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PokemonSearchService
{
    /**
     * Search Pokemon cards with advanced filters
     */
    public function searchCards(Request $request): array
    {
        $query = PokemonCard::query();

        // Basic text search
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('abilities', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('attacks', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('text', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Type filter
        if ($request->filled('types')) {
            $types = $request->input('types');
            $query->where(function ($q) use ($types) {
                foreach ($types as $type) {
                    $q->orWhereJsonContains('types', $type);
                }
            });
        }

        // Supertype filter
        if ($request->filled('supertypes')) {
            $query->whereIn('supertype', $request->input('supertypes'));
        }

        // Subtype filter
        if ($request->filled('subtypes')) {
            $subtypes = $request->input('subtypes');
            $query->where(function ($q) use ($subtypes) {
                foreach ($subtypes as $subtype) {
                    $q->orWhereJsonContains('subtypes', $subtype);
                }
            });
        }

        // Rarity filter
        if ($request->filled('rarities')) {
            $query->whereIn('rarity', $request->input('rarities'));
        }

        // Set filter
        if ($request->filled('sets')) {
            $query->whereIn('set_id', $request->input('sets'));
        }

        // HP range filter
        if ($request->filled('hp_min')) {
            $query->where('hp', '>=', $request->input('hp_min'));
        }
        if ($request->filled('hp_max')) {
            $query->where('hp', '<=', $request->input('hp_max'));
        }

        // Attack cost filter
        if ($request->filled('attack_types')) {
            $attackTypes = $request->input('attack_types');
            $query->where(function ($q) use ($attackTypes) {
                foreach ($attackTypes as $type) {
                    $q->orWhere('attacks', 'LIKE', "%\"{$type}\"%");
                }
            });
        }

        // Weakness/Resistance filter
        if ($request->filled('weaknesses')) {
            $weaknesses = $request->input('weaknesses');
            $query->where(function ($q) use ($weaknesses) {
                foreach ($weaknesses as $weakness) {
                    $q->orWhereJsonContains('weaknesses', ['type' => $weakness]);
                }
            });
        }

        if ($request->filled('resistances')) {
            $resistances = $request->input('resistances');
            $query->where(function ($q) use ($resistances) {
                foreach ($resistances as $resistance) {
                    $q->orWhereJsonContains('resistances', ['type' => $resistance]);
                }
            });
        }

        // Artist filter
        if ($request->filled('artists')) {
            $query->whereIn('artist', $request->input('artists'));
        }

        // Sort options
        $sortBy = $request->input('sort_by', 'name');
        $sortOrder = $request->input('sort_order', 'asc');

        switch ($sortBy) {
            case 'name':
                $query->orderBy('name', $sortOrder);
                break;
            case 'set':
                $query->orderBy('set_name', $sortOrder)->orderBy('number', $sortOrder);
                break;
            case 'rarity':
                $query->orderByRaw("FIELD(rarity, 'Common', 'Uncommon', 'Rare', 'Rare Holo', 'Rare Ultra', 'Rare Secret') {$sortOrder}");
                break;
            case 'hp':
                $query->orderBy('hp', $sortOrder);
                break;
            case 'market_price':
                $query->orderBy('market_price', $sortOrder);
                break;
            default:
                $query->orderBy('name', $sortOrder);
        }

        // Pagination
        $perPage = min($request->input('per_page', 20), 100);
        $page = $request->input('page', 1);

        $results = $query->paginate($perPage, ['*'], 'page', $page);

        return [
            'cards' => $results->items(),
            'pagination' => [
                'current_page' => $results->currentPage(),
                'last_page' => $results->lastPage(),
                'per_page' => $results->perPage(),
                'total' => $results->total(),
                'from' => $results->firstItem(),
                'to' => $results->lastItem(),
            ],
        ];
    }

    /**
     * Get search suggestions for autocomplete
     */
    public function getSearchSuggestions(string $query): array
    {
        if (strlen($query) < 2) {
            return [];
        }

        $cacheKey = "search_suggestions_" . strtolower($query);
        
        return Cache::remember($cacheKey, 3600, function () use ($query) {
            $suggestions = [];

            // Card names
            $nameSuggestions = PokemonCard::where('name', 'LIKE', "%{$query}%")
                ->limit(10)
                ->pluck('name')
                ->toArray();
            
            // Artist names
            $artistSuggestions = PokemonCard::where('artist', 'LIKE', "%{$query}%")
                ->distinct()
                ->limit(5)
                ->pluck('artist')
                ->toArray();

            // Set names
            $setSuggestions = PokemonCard::where('set_name', 'LIKE', "%{$query}%")
                ->distinct()
                ->limit(5)
                ->pluck('set_name')
                ->toArray();

            // Ability names
            $abilitySuggestions = PokemonCard::where('abilities', 'LIKE', "%{$query}%")
                ->limit(5)
                ->get()
                ->map(function ($card) use ($query) {
                    $abilities = json_decode($card->abilities, true) ?? [];
                    foreach ($abilities as $ability) {
                        if (stripos($ability['name'] ?? '', $query) !== false) {
                            return $ability['name'];
                        }
                    }
                    return null;
                })
                ->filter()
                ->take(5)
                ->toArray();

            return [
                'names' => $nameSuggestions,
                'artists' => $artistSuggestions,
                'sets' => $setSuggestions,
                'abilities' => $abilitySuggestions,
            ];
        });
    }

    /**
     * Get all available filter options
     */
    public function getFilterOptions(): array
    {
        $cacheKey = 'pokemon_filter_options';
        
        return Cache::remember($cacheKey, 86400, function () {
            return [
                'types' => $this->getUniqueTypes(),
                'supertypes' => PokemonCard::distinct()->pluck('supertype')->sort()->values(),
                'subtypes' => $this->getUniqueSubtypes(),
                'rarities' => PokemonCard::distinct()->orderByRaw('FIELD(rarity, "Common", "Uncommon", "Rare", "Rare Holo", "Rare Ultra", "Rare Secret")')->pluck('rarity')->filter()->values(),
                'sets' => PokemonCard::select('set_id', 'set_name', 'set_series')->distinct()->orderBy('set_name')->get()->map(function ($set) {
                    return [
                        'id' => $set->set_id,
                        'name' => $set->set_name,
                        'series' => $set->set_series,
                    ];
                }),
                'artists' => PokemonCard::distinct()->orderBy('artist')->pluck('artist')->filter()->sort()->values(),
                'hp_range' => [
                    'min' => PokemonCard::min('hp'),
                    'max' => PokemonCard::max('hp'),
                ],
            ];
        });
    }

    /**
     * Get unique Pokemon types from all cards
     */
    private function getUniqueTypes(): array
    {
        $types = [];
        $cards = PokemonCard::whereNotNull('types')->get();
        
        foreach ($cards as $card) {
            $cardTypes = json_decode($card->types, true) ?? [];
            $types = array_merge($types, $cardTypes);
        }
        
        return array_values(array_unique($types));
    }

    /**
     * Get unique subtypes from all cards
     */
    private function getUniqueSubtypes(): array
    {
        $subtypes = [];
        $cards = PokemonCard::whereNotNull('subtypes')->get();
        
        foreach ($cards as $card) {
            $cardSubtypes = json_decode($card->subtypes, true) ?? [];
            $subtypes = array_merge($subtypes, $cardSubtypes);
        }
        
        return array_values(array_unique($subtypes));
    }
}
