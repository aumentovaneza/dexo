<?php

namespace App\Services;

use App\Models\PokemonCard;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PriceTrackingService
{
    /**
     * Get current market price for a Pokemon card
     */
    public function getCurrentPrice(PokemonCard $card): array
    {
        $cacheKey = "card_price_{$card->id}";
        
        return Cache::remember($cacheKey, 3600, function () use ($card) {
            // Try to get price from TCGPlayer API (mock implementation)
            $price = $this->fetchPriceFromTCGPlayer($card);
            
            if (!$price) {
                // Fallback to cached price or generate mock price
                $price = $this->generateMockPrice($card);
            }
            
            return [
                'current_price' => $price,
                'price_updated_at' => now(),
                'currency' => 'USD',
                'marketplace' => 'TCGPlayer',
                'trend' => $this->calculatePriceTrend($card, $price),
            ];
        });
    }

    /**
     * Get price history for a Pokemon card
     */
    public function getPriceHistory(PokemonCard $card, int $days = 30): array
    {
        $cacheKey = "card_price_history_{$card->id}_{$days}";
        
        return Cache::remember($cacheKey, 86400, function () use ($card, $days) {
            // Generate mock historical data
            $history = [];
            $currentPrice = $card->market_price ?? $this->generateMockPrice($card);
            
            for ($i = $days; $i >= 0; $i--) {
                $date = now()->subDays($i);
                $priceVariation = $currentPrice * (1 + (rand(-20, 20) / 100));
                
                $history[] = [
                    'date' => $date->format('Y-m-d'),
                    'price' => round($priceVariation, 2),
                    'volume' => rand(100, 1000),
                ];
            }
            
            return $history;
        });
    }

    /**
     * Update prices for multiple cards
     */
    public function updateMultiplePrices(array $cardIds): array
    {
        $results = [];
        $batchSize = 10;
        
        foreach (array_chunk($cardIds, $batchSize) as $batch) {
            foreach ($batch as $cardId) {
                try {
                    $card = PokemonCard::find($cardId);
                    if ($card) {
                        $priceData = $this->getCurrentPrice($card);
                        $card->update([
                            'market_price' => $priceData['current_price'],
                            'price_updated_at' => $priceData['price_updated_at'],
                        ]);
                        
                        $results[$cardId] = [
                            'success' => true,
                            'price' => $priceData['current_price'],
                        ];
                    }
                } catch (\Exception $e) {
                    Log::error("Failed to update price for card {$cardId}: " . $e->getMessage());
                    $results[$cardId] = [
                        'success' => false,
                        'error' => $e->getMessage(),
                    ];
                }
                
                // Rate limiting - avoid overwhelming external APIs
                usleep(100000); // 0.1 second delay
            }
        }
        
        return $results;
    }

    /**
     * Get price alerts for user's collection
     */
    public function getPriceAlerts($userId): array
    {
        $userCards = \App\Models\UserPokemonCollection::where('user_id', $userId)
            ->with('pokemonCard')
            ->get();

        $alerts = [];
        
        foreach ($userCards as $userCard) {
            $card = $userCard->pokemonCard;
            $priceData = $this->getCurrentPrice($card);
            
            // Check for significant price changes
            $oldPrice = $card->market_price ?? 0;
            $newPrice = $priceData['current_price'];
            $priceChange = (($newPrice - $oldPrice) / $oldPrice) * 100;
            
            if (abs($priceChange) > 15) { // 15% change threshold
                $alerts[] = [
                    'card' => $card,
                    'old_price' => $oldPrice,
                    'new_price' => $newPrice,
                    'change_percentage' => round($priceChange, 2),
                    'quantity' => $userCard->quantity,
                    'total_value_change' => round(($newPrice - $oldPrice) * $userCard->quantity, 2),
                    'type' => $priceChange > 0 ? 'increase' : 'decrease',
                ];
            }
        }
        
        return $alerts;
    }

    /**
     * Get market trends for popular cards
     */
    public function getMarketTrends(): array
    {
        $cacheKey = 'market_trends';
        
        return Cache::remember($cacheKey, 3600, function () {
            // Get top trending cards (mock implementation)
            $trendingCards = PokemonCard::inRandomOrder()->limit(10)->get();
            
            $trends = [];
            foreach ($trendingCards as $card) {
                $priceData = $this->getCurrentPrice($card);
                $history = $this->getPriceHistory($card, 7); // 7 days
                
                $trends[] = [
                    'card' => $card,
                    'current_price' => $priceData['current_price'],
                    'weekly_change' => $this->calculateWeeklyChange($history),
                    'volume' => rand(500, 5000),
                    'trend_direction' => $this->getTrendDirection($history),
                ];
            }
            
            return $trends;
        });
    }

    /**
     * Fetch price from TCGPlayer API (mock implementation)
     */
    private function fetchPriceFromTCGPlayer(PokemonCard $card): ?float
    {
        // In a real implementation, this would call TCGPlayer API
        // For now, we'll return null to use mock prices
        return null;
        
        // Example real implementation would look like:
        /*
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.tcgplayer.api_key'),
        ])->get("https://api.tcgplayer.com/v1/prices/product/{$card->tcgplayer_id}");
        
        if ($response->successful()) {
            $data = $response->json();
            return $data['results'][0]['marketPrice'] ?? null;
        }
        
        return null;
        */
    }

    /**
     * Generate mock price based on card attributes
     */
    private function generateMockPrice(PokemonCard $card): float
    {
        $basePrice = 1.00;
        
        // Price modifiers based on rarity
        $rarityModifiers = [
            'Common' => 1,
            'Uncommon' => 1.5,
            'Rare' => 3,
            'Rare Holo' => 8,
            'Rare Ultra' => 25,
            'Rare Secret' => 50,
        ];
        
        $rarity = $card->rarity ?? 'Common';
        $basePrice *= $rarityModifiers[$rarity] ?? 1;
        
        // Additional modifiers
        if (str_contains(strtolower($card->name ?? ''), 'charizard')) {
            $basePrice *= 2;
        }
        
        if ($card->supertype === 'Pokémon') {
            $basePrice *= 1.5;
        }
        
        // Add some randomness
        $basePrice *= (1 + (rand(-30, 50) / 100));
        
        return round($basePrice, 2);
    }

    /**
     * Calculate price trend for a card
     */
    private function calculatePriceTrend(PokemonCard $card, float $currentPrice): string
    {
        $history = $this->getPriceHistory($card, 7);
        
        if (count($history) < 2) {
            return 'stable';
        }
        
        $oldPrice = $history[0]['price'];
        $change = (($currentPrice - $oldPrice) / $oldPrice) * 100;
        
        if ($change > 5) {
            return 'rising';
        } elseif ($change < -5) {
            return 'falling';
        }
        
        return 'stable';
    }

    /**
     * Calculate weekly price change
     */
    private function calculateWeeklyChange(array $history): float
    {
        if (count($history) < 2) {
            return 0;
        }
        
        $startPrice = $history[0]['price'];
        $endPrice = $history[count($history) - 1]['price'];
        
        return round((($endPrice - $startPrice) / $startPrice) * 100, 2);
    }

    /**
     * Get trend direction based on history
     */
    private function getTrendDirection(array $history): string
    {
        $weeklyChange = $this->calculateWeeklyChange($history);
        
        if ($weeklyChange > 5) {
            return 'up';
        } elseif ($weeklyChange < -5) {
            return 'down';
        }
        
        return 'stable';
    }
}
