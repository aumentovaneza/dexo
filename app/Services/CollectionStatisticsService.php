<?php

namespace App\Services;

use App\Models\UserPokemonCollection;
use App\Models\PokemonCard;
use Illuminate\Support\Facades\Auth;

class CollectionStatisticsService
{
    /**
     * Get comprehensive collection statistics for a user
     */
    public function getUserCollectionStats($userId = null): array
    {
        $userId = $userId ?? Auth::id();
        
        $collection = UserPokemonCollection::where('user_id', $userId)
            ->with('pokemonCard')
            ->get();

        $totalCards = $collection->sum('quantity');
        $uniqueCards = $collection->count();
        
        // Calculate collection value (mock prices for now)
        $totalValue = $collection->sum(function ($item) {
            return $item->quantity * ($item->pokemonCard->market_price ?? 0);
        });

        // Card type distribution
        $typeDistribution = [];
        $rarityDistribution = [];
        $setDistribution = [];
        
        foreach ($collection as $item) {
            $card = $item->pokemonCard;
            
            // Type distribution
            $types = $card->types ?? [];
            foreach ($types as $type) {
                $typeDistribution[$type] = ($typeDistribution[$type] ?? 0) + $item->quantity;
            }
            
            // Rarity distribution
            $rarity = $card->rarity ?? 'Unknown';
            $rarityDistribution[$rarity] = ($rarityDistribution[$rarity] ?? 0) + $item->quantity;
            
            // Set distribution
            $set = $card->set_name ?? 'Unknown';
            $setDistribution[$set] = ($setDistribution[$set] ?? 0) + $item->quantity;
        }

        arsort($typeDistribution);
        arsort($rarityDistribution);
        arsort($setDistribution);

        // Most valuable cards
        $mostValuable = $collection->sortByDesc(function ($item) {
            return ($item->pokemonCard->market_price ?? 0) * $item->quantity;
        })->take(10);

        // Recent additions
        $recentAdditions = $collection->sortByDesc('created_at')->take(5);

        // Collection completion by set
        $setCompletion = $this->getSetCompletionStats($userId);

        return [
            'overview' => [
                'total_cards' => $totalCards,
                'unique_cards' => $uniqueCards,
                'total_value' => $totalValue,
                'average_card_value' => $totalCards > 0 ? $totalValue / $totalCards : 0,
            ],
            'distributions' => [
                'types' => $typeDistribution,
                'rarities' => $rarityDistribution,
                'sets' => $setDistribution,
            ],
            'highlights' => [
                'most_valuable' => $mostValuable->values()->all(),
                'recent_additions' => $recentAdditions->values()->all(),
            ],
            'set_completion' => $setCompletion,
        ];
    }

    /**
     * Get collection completion statistics by set
     */
    private function getSetCompletionStats($userId): array
    {
        $userCards = UserPokemonCollection::where('user_id', $userId)
            ->with('pokemonCard')
            ->get()
            ->groupBy(function ($item) {
                return $item->pokemonCard->set_id ?? 'unknown';
            });

        $completionStats = [];

        foreach ($userCards as $setId => $cards) {
            $totalCardsInSet = PokemonCard::where('set_id', $setId)->count();
            $userCardsInSet = $cards->count();
            $completionPercentage = $totalCardsInSet > 0 
                ? round(($userCardsInSet / $totalCardsInSet) * 100, 2) 
                : 0;

            $setName = $cards->first()->pokemonCard->set_name ?? 'Unknown Set';

            $completionStats[] = [
                'set_id' => $setId,
                'set_name' => $setName,
                'total_cards_in_set' => $totalCardsInSet,
                'user_cards_in_set' => $userCardsInSet,
                'completion_percentage' => $completionPercentage,
                'is_complete' => $completionPercentage >= 100,
            ];
        }

        // Sort by completion percentage
        usort($completionStats, function ($a, $b) {
            return $b['completion_percentage'] <=> $a['completion_percentage'];
        });

        return $completionStats;
    }

    /**
     * Get collection trends over time
     */
    public function getCollectionTrends($userId = null): array
    {
        $userId = $userId ?? Auth::id();
        
        // Get monthly collection growth
        $monthlyGrowth = UserPokemonCollection::where('user_id', $userId)
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as cards_added, SUM(quantity) as total_quantity')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Get collection value trends (mock data for now)
        $valueTrends = [];
        foreach ($monthlyGrowth as $month) {
            $valueTrends[] = [
                'month' => $month->month,
                'cards_added' => $month->cards_added,
                'total_quantity' => $month->total_quantity,
                'estimated_value' => $month->total_quantity * 5.50, // Mock average value
            ];
        }

        return [
            'monthly_growth' => $valueTrends,
            'total_months' => count($valueTrends),
            'average_cards_per_month' => count($valueTrends) > 0 
                ? round($monthlyGrowth->sum('total_quantity') / count($valueTrends), 2) 
                : 0,
        ];
    }

    /**
     * Get collection insights and recommendations
     */
    public function getCollectionInsights($userId = null): array
    {
        $stats = $this->getUserCollectionStats($userId);
        $insights = [];
        $recommendations = [];

        // Collection size insights
        if ($stats['overview']['total_cards'] < 100) {
            $insights[] = "You're just getting started! Consider expanding your collection with staple trainer cards.";
        } elseif ($stats['overview']['total_cards'] > 1000) {
            $insights[] = "Impressive collection! You might want to focus on completing specific sets.";
        }

        // Type balance insights
        $types = $stats['distributions']['types'];
        if (count($types) <= 2) {
            $recommendations[] = "Consider diversifying your collection with more Pokémon types for versatility.";
        }

        // Rarity insights
        $rarities = $stats['distributions']['rarities'];
        $holoPercentage = isset($rarities['Holo Rare']) 
            ? round(($rarities['Holo Rare'] / $stats['overview']['total_cards']) * 100, 2) 
            : 0;

        if ($holoPercentage < 10) {
            $recommendations[] = "Consider adding more rare and holo cards to increase collection value.";
        }

        // Set completion insights
        $nearCompleteSets = array_filter($stats['set_completion'], function ($set) {
            return $set['completion_percentage'] >= 80 && $set['completion_percentage'] < 100;
        });

        if (!empty($nearCompleteSets)) {
            $recommendations[] = "You're close to completing " . count($nearCompleteSets) . " set(s)! Focus on finishing these collections.";
        }

        return [
            'insights' => $insights,
            'recommendations' => $recommendations,
            'collection_score' => $this->calculateCollectionStats($stats),
        ];
    }

    /**
     * Calculate a collection score based on various factors
     */
    private function calculateCollectionStats(array $stats): int
    {
        $score = 0;
        
        // Base score for collection size
        $score += min($stats['overview']['total_cards'] * 0.1, 50);
        
        // Bonus for unique cards
        $score += min($stats['overview']['unique_cards'] * 0.2, 30);
        
        // Bonus for type diversity
        $score += min(count($stats['distributions']['types']) * 5, 20);
        
        // Bonus for set completion
        $completedSets = array_filter($stats['set_completion'], function ($set) {
            return $set['is_complete'];
        });
        $score += count($completedSets) * 10;
        
        return min(round($score), 100);
    }
}
