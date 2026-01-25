<?php

namespace App\Services;

use App\Models\PokemonCard;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PokemonTcgApiService
{
    protected $baseUrl = 'https://api.pokemontcg.io/v2';
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.pokemon_tcg.api_key');
    }


    public function getAllCards()
    {
        $allCards = [];
        $page = 1;
        $hasMorePages = true;

        while ($hasMorePages) {
            $response = Http::withHeaders([
                'X-Api-Key' => $this->apiKey
            ])->get("{$this->baseUrl}/cards", [
                'page' => $page,
                'pageSize' => 250 // Maximum page size allowed by the API
            ]);

            if (!$response->successful()) {
                Log::error('Failed to fetch Pokemon cards', [
                    'status' => $response->status(),
                    'response' => $response->body(),
                    'page' => $page
                ]);
                break;
            }

            $responseData = $response->json();
            $cards = $responseData['data'] ?? [];
            $allCards = array_merge($allCards, $cards);

            // Check if we've reached the last page
            $currentPage = $responseData['page'] ?? 1;
            $totalCount = $responseData['totalCount'] ?? 0;
            $pageSize = $responseData['pageSize'] ?? 250;

            $hasMorePages = ($currentPage * $pageSize < $totalCount);
            $page++;
        }

        return $allCards;
    }

    /**
     * Get a single card by its ID
     */
    public function getCard(string $id): ?array
    {
        try {
            $response = Http::withHeaders([
                'X-Api-Key' => $this->apiKey
            ])->get("{$this->baseUrl}/cards/{$id}");

            if ($response->successful()) {
                return $response->json()['data'];
            }

            Log::error('Failed to fetch Pokemon card', [
                'id' => $id,
                'status' => $response->status(),
                'response' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('Exception when fetching Pokemon card', [
                'id' => $id,
                'exception' => $e->getMessage()
            ]);

            return null;
        }
    }

    /**
     * Search for cards with given parameters
     */
    public function searchCards(array $params = [], int $page = 1, int $pageSize = 20): ?array
    {
        try {
            $response = Http::withHeaders([
                'X-Api-Key' => $this->apiKey
            ])->get("{$this->baseUrl}/cards", array_merge($params, [
                'page' => $page,
                'pageSize' => $pageSize,
            ]));

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Failed to search Pokemon cards', [
                'params' => $params,
                'status' => $response->status(),
                'response' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('Exception when searching Pokemon cards', [
                'params' => $params,
                'exception' => $e->getMessage()
            ]);

            return null;
        }
    }

    /**
     * Store a card from the API in the local database
     */
    public function storeCardInDatabase(array $cardData): PokemonCard
    {
        return PokemonCard::updateOrCreate(
            ['tcg_id' => $cardData['id']],
            [
                'name' => $cardData['name'],
                'supertype' => $cardData['supertype'],
                'subtypes' => $cardData['subtypes'] ?? [],
                'hp' => $cardData['hp'] ?? null,
                'types' => $cardData['types'] ?? [],
                'level' => $cardData['level'] ?? null,
                'evolves_from' => $cardData['evolvesFrom'] ?? null,
                'evolves_to' => $cardData['evolvesTo'] ?? [],
                'rules' => $cardData['rules'] ?? [],
                'ancient_trait' => $cardData['ancientTrait'] ?? null,
                'abilities' => $cardData['abilities'] ?? [],
                'attacks' => $cardData['attacks'] ?? [],
                'weaknesses' => $cardData['weaknesses'] ?? [],
                'resistances' => $cardData['resistances'] ?? [],
                'retreat_cost' => $cardData['retreatCost'] ?? [],
                'converted_retreat_cost' => $cardData['convertedRetreatCost'] ?? null,
                'set' => $cardData['set']['name'] ?? null,
                'set_details' => $cardData['set'] ?? [],
                'number' => $cardData['number'] ?? null,
                'artist' => $cardData['artist'] ?? null,
                'rarity' => $cardData['rarity'] ?? null,
                'flavor_text' => $cardData['flavorText'] ?? null,
                'national_pokedex_numbers' => $cardData['nationalPokedexNumbers'] ?? [],
                'legalities' => $cardData['legalities'] ?? [],
                'regulation_mark' => $cardData['regulationMark'] ?? null,
                'images' => $cardData['images'] ?? [],
                'tcgplayer' => $cardData['tcgplayer'] ?? [],
                'cardmarket' => $cardData['cardmarket'] ?? [],
            ]
        );
    }
}
