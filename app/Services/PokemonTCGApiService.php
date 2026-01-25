<?php

namespace App\Services;

use App\Models\PokemonCard;
use TCGdex\TCGdex;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpClient\Psr18Client;
use Nyholm\Psr7\Factory\Psr17Factory;

class PokemonTcgApiService
{
    private TCGdex $tcgdex;
    private $rateLimitDelay = 1; // seconds between requests
    
    public function __construct()
    {
        // Configure PSR implementations for TCGdex
        $psr17Factory = new Psr17Factory();
        TCGdex::$requestFactory = $psr17Factory;
        TCGdex::$responseFactory = $psr17Factory;
        TCGdex::$client = new Psr18Client();
        
        // Initialize the SDK with language (defaults to "en")
        $this->tcgdex = new TCGdex('en');
        
        // Load configuration
        $this->rateLimitDelay = config('services.pokemon_tcg.rate_limit_delay', 1);
    }

    public function getAllCards()
    {
        try {
            $allCards = [];
            $this->logInfo("Fetching all cards from TCGdex API");
            
            // Get all cards using the list method
            $cards = $this->tcgdex->card->list();
            
            if (empty($cards)) {
                Log::warning('No cards returned from TCGdex API');
                return [];
            }
            
            $this->logInfo("TCGdex returned " . count($cards) . " cards");
            
            // Convert TCGdex card objects to arrays - limit to first 100 for testing
            $cardCount = 0;
            $maxCards = 100; // Limit for testing
            
            foreach ($cards as $card) {
                if ($cardCount >= $maxCards) {
                    break;
                }
                
                $cardData = $this->convertTcgdexCardToArray($card);
                if ($cardData) {
                    $allCards[] = $cardData;
                    $cardCount++;
                } else {
                    Log::warning('Failed to convert card to array', ['card_id' => $card->id ?? 'unknown']);
                }
                
                // Apply rate limiting delay between requests
                $this->applyRateLimitDelay();
            }
            
            $this->logInfo("Successfully fetched " . count($allCards) . " cards (limited to {$maxCards} for testing)");
            return $allCards;
            
        } catch (\Exception $e) {
            Log::error('Exception when fetching all Pokemon cards from TCGdex', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return [];
        }
    }

    public function getCard(string $id): ?array
    {
        try {
            $card = $this->tcgdex->card->get($id);
            
            if ($card) {
                return $this->convertTcgdexCardToArray($card);
            }

            Log::error('Failed to fetch Pokemon card from TCGdex', [
                'id' => $id
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('Exception when fetching Pokemon card from TCGdex', [
                'id' => $id,
                'exception' => $e->getMessage()
            ]);

            return null;
        }
    }

    public function searchCards(array $params = []): ?array
    {
        try {
            // TCGdex doesn't have the same filtering as the old API
            // For now, get all cards and filter manually
            $allCards = $this->getAllCards();
            
            if (empty($params)) {
                return $allCards;
            }
            
            // Filter cards based on params
            $filteredCards = array_filter($allCards, function($card) use ($params) {
                foreach ($params as $key => $value) {
                    if (!isset($card[$key]) || $card[$key] !== $value) {
                        return false;
                    }
                }
                return true;
            });
            
            return array_values($filteredCards);
            
        } catch (\Exception $e) {
            Log::error('Exception when searching Pokemon cards from TCGdex', [
                'params' => $params,
                'exception' => $e->getMessage()
            ]);

            return null;
        }
    }

    public function storeCardInDatabase(array $cardData): PokemonCard
    {
        return PokemonCard::updateOrCreate(
            ['tcg_id' => $cardData['id']],
            [
                'name' => $cardData['name'],
                'supertype' => $cardData['supertype'] ?? null,
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
                'artist' => $cardData['illustrator'] ?? null,
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

    private function convertTcgdexCardToArray($card): ?array
    {
        try {
            if (!$card) {
                return null;
            }

            return [
                'id' => $card->id ?? null,
                'name' => $card->name ?? null,
                'supertype' => $card->supertype ?? null,
                'subtypes' => $card->subtypes ?? [],
                'hp' => $card->hp ?? null,
                'types' => $card->types ?? [],
                'level' => $card->level ?? null,
                'evolvesFrom' => $card->evolvesFrom ?? null,
                'evolvesTo' => $card->evolvesTo ?? [],
                'rules' => $card->rules ?? [],
                'ancientTrait' => $card->ancientTrait ?? null,
                'abilities' => $this->convertAbilities($card->abilities ?? []),
                'attacks' => $this->convertAttacks($card->attacks ?? []),
                'weaknesses' => $this->convertWeaknesses($card->weaknesses ?? []),
                'resistances' => $this->convertResistances($card->resistances ?? []),
                'retreatCost' => $card->retreatCost ?? [],
                'convertedRetreatCost' => $card->convertedRetreatCost ?? null,
                'set' => $this->convertSet($card->set),
                'number' => $card->number ?? null,
                'illustrator' => $card->illustrator ?? null,
                'rarity' => $card->rarity ?? null,
                'flavorText' => $card->flavorText ?? null,
                'nationalPokedexNumbers' => $card->nationalPokedexNumbers ?? [],
                'legalities' => $card->legalities ?? [],
                'regulationMark' => $card->regulationMark ?? null,
                'images' => $this->convertImages($card->images ?? []),
                'tcgplayer' => $card->tcgplayer ?? [],
                'cardmarket' => $card->cardmarket ?? [],
            ];
        } catch (\Exception $e) {
            Log::error('Error converting TCGdex card to array', [
                'exception' => $e->getMessage()
            ]);
            return null;
        }
    }

    private function convertAbilities($abilities): array
    {
        $result = [];
        foreach ($abilities as $ability) {
            $result[] = [
                'name' => $ability->name ?? null,
                'text' => $ability->text ?? null,
                'type' => $ability->type ?? null,
            ];
        }
        return $result;
    }

    private function convertAttacks($attacks): array
    {
        $result = [];
        foreach ($attacks as $attack) {
            $result[] = [
                'name' => $attack->name ?? null,
                'cost' => $attack->cost ?? [],
                'convertedEnergyCost' => $attack->convertedEnergyCost ?? null,
                'damage' => $attack->damage ?? null,
                'text' => $attack->text ?? null,
            ];
        }
        return $result;
    }

    private function convertWeaknesses($weaknesses): array
    {
        $result = [];
        foreach ($weaknesses as $weakness) {
            $result[] = [
                'type' => $weakness->type ?? null,
                'value' => $weakness->value ?? null,
            ];
        }
        return $result;
    }

    private function convertResistances($resistances): array
    {
        $result = [];
        foreach ($resistances as $resistance) {
            $result[] = [
                'type' => $resistance->type ?? null,
                'value' => $resistance->value ?? null,
            ];
        }
        return $result;
    }

    private function convertSet($set): array
    {
        if (!$set) {
            return [];
        }

        return [
            'id' => $set->id ?? null,
            'name' => $set->name ?? null,
            'series' => $set->series ?? null,
            'printedTotal' => $set->printedTotal ?? null,
            'total' => $set->total ?? null,
            'legalities' => $set->legalities ?? [],
            'ptcgoCode' => $set->ptcgoCode ?? null,
            'releaseDate' => $set->releaseDate ?? null,
            'updatedAt' => $set->updatedAt ?? null,
            'images' => $set->images ?? [],
        ];
    }

    private function convertImages($images): array
    {
        if (!$images) {
            return [];
        }

        return [
            'small' => $images->small ?? null,
            'large' => $images->large ?? null,
        ];
    }

    private function applyRateLimitDelay(): void
    {
        if ($this->rateLimitDelay > 0) {
            usleep((int) ($this->rateLimitDelay * 1000000)); // Convert to microseconds
        }
    }

    private function logInfo(string $message, array $context = []): void
    {
        Log::info($message, $context);
    }
}
