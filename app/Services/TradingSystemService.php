<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserPokemonCollection;
use App\Models\Trade;
use App\Models\TradeItem;
use App\Services\ShippingCalculatorService;
use App\Services\CurrencyConverterService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TradingSystemService
{
    protected $shippingCalculator;
    protected $currencyConverter;

    public function __construct(
        ShippingCalculatorService $shippingCalculator,
        CurrencyConverterService $currencyConverter
    ) {
        $this->shippingCalculator = $shippingCalculator;
        $this->currencyConverter = $currencyConverter;
    }

    /**
     * Create a new trade offer
     */
    public function createTradeOffer($userId, array $tradeData): Trade
    {
        return DB::transaction(function () use ($userId, $tradeData) {
            $trade = Trade::create([
                'user_id' => $userId,
                'recipient_id' => $tradeData['recipient_id'],
                'trade_type' => $tradeData['trade_type'], // 'local' or 'international'
                'status' => 'pending',
                'notes' => $tradeData['notes'] ?? null,
                'expires_at' => now()->addDays(7),
            ]);

            // Add trade items (offering)
            foreach ($tradeData['offering'] as $item) {
                $this->validateAndLockCard($userId, $item['card_id'], $item['quantity']);
                
                TradeItem::create([
                    'trade_id' => $trade->id,
                    'user_id' => $userId,
                    'pokemon_card_id' => $item['card_id'],
                    'quantity' => $item['quantity'],
                    'condition' => $item['condition'] ?? 'Near Mint',
                    'is_offering' => true,
                    'estimated_value' => $this->calculateCardValue($item['card_id'], $item['condition']),
                ]);
            }

            // Add trade items (requesting)
            foreach ($tradeData['requesting'] as $item) {
                TradeItem::create([
                    'trade_id' => $trade->id,
                    'user_id' => $tradeData['recipient_id'],
                    'pokemon_card_id' => $item['card_id'],
                    'quantity' => $item['quantity'],
                    'condition' => $item['condition'] ?? 'Near Mint',
                    'is_offering' => false,
                    'estimated_value' => $this->calculateCardValue($item['card_id'], $item['condition']),
                ]);
            }

            return $trade->load(['tradeItems.pokemonCard', 'user', 'recipient']);
        });
    }

    /**
     * Calculate shipping costs and options
     */
    public function calculateShippingOptions(Trade $trade): array
    {
        $sender = $trade->user;
        $recipient = $trade->recipient;
        
        $isInternational = $this->isInternationalTrade($sender, $recipient);
        $packageWeight = $this->calculatePackageWeight($trade);
        $packageValue = $this->calculatePackageValue($trade);

        $options = [];

        if ($isInternational) {
            $options = $this->getInternationalShippingOptions($sender, $recipient, $packageWeight, $packageValue);
        } else {
            $options = $this->getLocalShippingOptions($sender, $recipient, $packageWeight);
        }

        return [
            'is_international' => $isInternational,
            'estimated_weight' => $packageWeight,
            'estimated_value' => $packageValue,
            'options' => $options,
            'recommended' => $this->getRecommendedShipping($options),
        ];
    }

    /**
     * Get international shipping options
     */
    private function getInternationalShippingOptions($sender, $recipient, $weight, $value): array
    {
        $options = [];

        // Standard International (7-21 days)
        $options[] = [
            'id' => 'intl_standard',
            'name' => 'Standard International',
            'carrier' => 'USPS/Canada Post',
            'estimated_days' => '7-21',
            'cost' => $this->shippingCalculator->calculateInternational($sender->country, $recipient->country, $weight, 'standard'),
            'tracking' => true,
            'insurance' => false,
            'customs_declaration' => true,
        ];

        // Express International (3-7 days)
        $options[] = [
            'id' => 'intl_express',
            'name' => 'Express International',
            'carrier' => 'FedEx/DHL/UPS',
            'estimated_days' => '3-7',
            'cost' => $this->shippingCalculator->calculateInternational($sender->country, $recipient->country, $weight, 'express'),
            'tracking' => true,
            'insurance' => true,
            'customs_declaration' => true,
        ];

        // Registered Mail with Insurance
        if ($value > 50) {
            $options[] = [
                'id' => 'intl_registered',
                'name' => 'Registered International with Insurance',
                'carrier' => 'USPS/Canada Post',
                'estimated_days' => '10-20',
                'cost' => $this->shippingCalculator->calculateInternational($sender->country, $recipient->country, $weight, 'registered'),
                'tracking' => true,
                'insurance' => true,
                'customs_declaration' => true,
                'insurance_amount' => min($value, 500),
            ];
        }

        return $options;
    }

    /**
     * Get local shipping options
     */
    private function getLocalShippingOptions($sender, $recipient, $weight): array
    {
        $options = [];

        // Standard Mail
        $options[] = [
            'id' => 'local_standard',
            'name' => 'Standard Mail',
            'carrier' => 'USPS/Canada Post',
            'estimated_days' => '2-5',
            'cost' => $this->shippingCalculator->calculateLocal($sender->postal_code, $recipient->postal_code, $weight, 'standard'),
            'tracking' => false,
            'insurance' => false,
        ];

        // First Class with Tracking
        $options[] = [
            'id' => 'local_first_class',
            'name' => 'First Class with Tracking',
            'carrier' => 'USPS/Canada Post',
            'estimated_days' => '1-3',
            'cost' => $this->shippingCalculator->calculateLocal($sender->postal_code, $recipient->postal_code, $weight, 'first_class'),
            'tracking' => true,
            'insurance' => false,
        ];

        // Priority Mail
        $options[] = [
            'id' => 'local_priority',
            'name' => 'Priority Mail',
            'carrier' => 'USPS/Canada Post',
            'estimated_days' => '1-2',
            'cost' => $this->shippingCalculator->calculateLocal($sender->postal_code, $recipient->postal_code, $weight, 'priority'),
            'tracking' => true,
            'insurance' => true,
            'insurance_amount' => 100,
        ];

        return $options;
    }

    /**
     * Handle customs declaration for international trades
     */
    public function generateCustomsDeclaration(Trade $trade): array
    {
        $sender = $trade->user;
        $recipient = $trade->recipient;
        $offeringItems = $trade->tradeItems()->where('is_offering', true)->get();

        $totalValue = $offeringItems->sum('estimated_value');
        $itemCount = $offeringItems->sum('quantity');

        return [
            'sender_info' => [
                'name' => $sender->name,
                'address' => $sender->full_address,
                'country' => $sender->country,
            ],
            'recipient_info' => [
                'name' => $recipient->name,
                'address' => $recipient->full_address,
                'country' => $recipient->country,
            ],
            'package_contents' => [
                'description' => 'Trading Cards - Pokémon TCG',
                'quantity' => $itemCount,
                'value' => $totalValue,
                'currency' => $sender->currency ?? 'USD',
                'weight' => $this->calculatePackageWeight($trade),
            ],
            'customs_form' => [
                'type' => $totalValue > 100 ? 'CN22' : 'CN23',
                'category' => 'Collectible Trading Cards',
                'hs_code' => '9504.90.00',
                'requires_inspection' => $totalValue > 250,
            ],
        ];
    }

    /**
     * Calculate currency conversion for international trades
     */
    public function calculateCurrencyConversion(Trade $trade): array
    {
        $sender = $trade->user;
        $recipient = $trade->recipient;
        
        if ($sender->currency === $recipient->currency) {
            return [
                'conversion_needed' => false,
                'exchange_rate' => 1.0,
                'sender_currency' => $sender->currency,
                'recipient_currency' => $recipient->currency,
            ];
        }

        $exchangeRate = $this->currencyConverter->getRate($sender->currency, $recipient->currency);
        
        return [
            'conversion_needed' => true,
            'exchange_rate' => $exchangeRate,
            'sender_currency' => $sender->currency,
            'recipient_currency' => $recipient->currency,
            'last_updated' => now(),
        ];
    }

    /**
     * Validate trade for international compliance
     */
    public function validateInternationalTrade(Trade $trade): array
    {
        $issues = [];
        $warnings = [];

        $sender = $trade->user;
        $recipient = $trade->recipient;

        // Check country restrictions
        if ($this->isRestrictedCountry($recipient->country)) {
            $issues[] = "Trading to {$recipient->country} is restricted due to local regulations";
        }

        // Check value limits for customs
        $totalValue = $this->calculatePackageValue($trade);
        if ($totalValue > 1000) {
            $warnings[] = "High-value package (${$totalValue}) may require additional customs documentation";
        }

        // Check for prohibited items
        $prohibitedItems = $this->checkProhibitedItems($trade);
        if (!empty($prohibitedItems)) {
            $issues[] = "Some items cannot be shipped internationally: " . implode(', ', $prohibitedItems);
        }

        // Check shipping requirements
        if ($totalValue > 50) {
            $warnings[] = "Insurance recommended for packages over $50";
        }

        return [
            'is_valid' => empty($issues),
            'issues' => $issues,
            'warnings' => $warnings,
        ];
    }

    /**
     * Get trade safety recommendations
     */
    public function getSafetyRecommendations(Trade $trade): array
    {
        $recommendations = [];
        $isInternational = $this->isInternationalTrade($trade->user, $trade->recipient);

        // Base recommendations for all trades
        $recommendations[] = [
            'type' => 'verification',
            'title' => 'Verify Trader Reputation',
            'description' => 'Check the trader\'s feedback score and recent trade history',
            'priority' => 'high',
        ];

        $recommendations[] = [
            'type' => 'documentation',
            'title' => 'Document Everything',
            'description' => 'Take photos of cards before shipping and keep all receipts',
            'priority' => 'high',
        ];

        if ($isInternational) {
            $recommendations[] = [
                'type' => 'shipping',
                'title' => 'Use Tracked Shipping',
                'description' => 'Always use tracked shipping for international trades',
                'priority' => 'critical',
            ];

            $recommendations[] = [
                'type' => 'customs',
                'title' => 'Complete Customs Forms',
                'description' => 'Accurately declare contents and value to avoid delays',
                'priority' => 'high',
            ];

            $recommendations[] = [
                'type' => 'payment',
                'title' => 'Use Secure Payment',
                'description' => 'Consider using escrow services for high-value trades',
                'priority' => 'medium',
            ];
        }

        // Value-based recommendations
        $tradeValue = $this->calculatePackageValue($trade);
        if ($tradeValue > 200) {
            $recommendations[] = [
                'type' => 'insurance',
                'title' => 'Get Shipping Insurance',
                'description' => 'Insure packages over $200 to protect against loss/damage',
                'priority' => 'high',
            ];
        }

        return $recommendations;
    }

    // Helper methods
    private function isInternationalTrade($sender, $recipient): bool
    {
        return $sender->country !== $recipient->country;
    }

    private function calculatePackageWeight(Trade $trade): float
    {
        // Base weight + card weight (approximately 2g per card + packaging)
        $cardCount = $trade->tradeItems()->where('is_offering', true)->sum('quantity');
        return 0.05 + ($cardCount * 0.002); // 50g base + 2g per card
    }

    private function calculatePackageValue(Trade $trade): float
    {
        return $trade->tradeItems()->where('is_offering', true)->sum('estimated_value');
    }

    private function calculateCardValue($cardId, $condition): float
    {
        // Get base market price and adjust for condition
        $basePrice = \App\Models\PokemonCard::find($cardId)?->market_price ?? 5.00;
        
        $conditionMultipliers = [
            'Mint' => 1.0,
            'Near Mint' => 0.9,
            'Excellent' => 0.8,
            'Good' => 0.6,
            'Played' => 0.4,
        ];

        return $basePrice * ($conditionMultipliers[$condition] ?? 0.8);
    }

    private function validateAndLockCard($userId, $cardId, $quantity): void
    {
        $userCard = UserPokemonCollection::where('user_id', $userId)
            ->where('pokemon_card_id', $cardId)
            ->firstOrFail();

        if ($userCard->quantity < $quantity) {
            throw new \Exception("Insufficient card quantity for trade");
        }

        // Lock the cards for trading
        $userCard->decrement('quantity', $quantity);
    }

    private function isRestrictedCountry($country): bool
    {
        $restricted = ['CU', 'IR', 'KP', 'SY', 'RU']; // Example restricted countries
        return in_array($country, $restricted);
    }

    private function checkProhibitedItems(Trade $trade): array
    {
        // Check for items that can't be shipped internationally
        $prohibited = [];
        
        foreach ($trade->tradeItems as $item) {
            $card = $item->pokemonCard;
            if ($card && str_contains(strtolower($card->name ?? ''), 'promo')) {
                // Some promotional cards might have shipping restrictions
                $prohibited[] = $card->name;
            }
        }

        return $prohibited;
    }

    private function getRecommendedShipping(array $options): array
    {
        // Recommend based on cost vs speed balance
        usort($options, function ($a, $b) {
            $scoreA = ($a['tracking'] ? 10 : 0) + ($a['insurance'] ? 5 : 0) - ($a['cost'] / 10);
            $scoreB = ($b['tracking'] ? 10 : 0) + ($b['insurance'] ? 5 : 0) - ($b['cost'] / 10);
            return $scoreB <=> $scoreA;
        });

        return $options[0] ?? [];
    }
}
