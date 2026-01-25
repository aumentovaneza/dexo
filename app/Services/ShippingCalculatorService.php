<?php

namespace App\Services;

class ShippingCalculatorService
{
    /**
     * Calculate international shipping costs
     */
    public function calculateInternational($fromCountry, $toCountry, $weight, $method = 'standard'): float
    {
        // Base rates for international shipping (USD)
        $baseRates = [
            'standard' => 15.00,
            'express' => 35.00,
            'registered' => 25.00,
        ];

        $baseCost = $baseRates[$method] ?? $baseRates['standard'];
        
        // Additional cost per 100g
        $weightCost = ceil($weight * 1000 / 100) * 3.00;
        
        // Country-specific surcharges
        $surcharges = [
            'AU' => 5.00,  // Australia
            'NZ' => 5.00,  // New Zealand
            'JP' => 3.00,  // Japan
            'GB' => 2.00,  // United Kingdom
            'DE' => 2.00,  // Germany
            'FR' => 2.00,  // France
        ];

        $surcharge = $surcharges[$toCountry] ?? 0;

        return $baseCost + $weightCost + $surcharge;
    }

    /**
     * Calculate local shipping costs
     */
    public function calculateLocal($fromPostal, $toPostal, $weight, $method = 'standard'): float
    {
        // Determine if same country (simplified for US/Canada)
        $isSameCountry = $this->isSameCountry($fromPostal, $toPostal);
        
        if (!$isSameCountry) {
            return $this->calculateInternational('US', 'CA', $weight, $method);
        }

        // Local shipping rates
        $baseRates = [
            'standard' => 3.50,
            'first_class' => 4.50,
            'priority' => 8.00,
        ];

        $baseCost = $baseRates[$method] ?? $baseRates['standard'];
        
        // Distance calculation (simplified)
        $distance = $this->calculateDistance($fromPostal, $toPostal);
        $distanceCost = $distance > 1000 ? 2.00 : 0;

        // Weight cost
        $weightCost = $weight > 0.1 ? ceil($weight * 1000 / 100) * 0.50 : 0;

        return $baseCost + $distanceCost + $weightCost;
    }

    private function isSameCountry($postal1, $postal2): bool
    {
        // US postal codes are numeric, Canadian are alphanumeric (A1A 1A1)
        return (is_numeric($postal1) && is_numeric($postal2)) || 
               (!is_numeric($postal1) && !is_numeric($postal2));
    }

    private function calculateDistance($postal1, $postal2): int
    {
        // Simplified distance calculation
        // In a real implementation, you'd use a geocoding service
        return rand(50, 2000);
    }
}
