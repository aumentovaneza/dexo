<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class CurrencyConverterService
{
    /**
     * Get exchange rate between two currencies
     */
    public function getRate($fromCurrency, $toCurrency): float
    {
        if ($fromCurrency === $toCurrency) {
            return 1.0;
        }

        $cacheKey = "exchange_rate_{$fromCurrency}_{$toCurrency}";
        
        return Cache::remember($cacheKey, 3600, function () use ($fromCurrency, $toCurrency) {
            // Try to get from free API (exchangerate-api.com)
            $response = Http::get("https://v6.exchangerate-api.com/v6/latest/{$fromCurrency}");
            
            if ($response->successful()) {
                $data = $response->json();
                return $data['conversion_rates'][$toCurrency] ?? 1.0;
            }

            // Fallback rates (mock data)
            return $this->getFallbackRate($fromCurrency, $toCurrency);
        });
    }

    /**
     * Convert amount from one currency to another
     */
    public function convert($amount, $fromCurrency, $toCurrency): float
    {
        $rate = $this->getRate($fromCurrency, $toCurrency);
        return round($amount * $rate, 2);
    }

    /**
     * Get supported currencies
     */
    public function getSupportedCurrencies(): array
    {
        return [
            'USD' => ['name' => 'US Dollar', 'symbol' => '$'],
            'CAD' => ['name' => 'Canadian Dollar', 'symbol' => 'C$'],
            'EUR' => ['name' => 'Euro', 'symbol' => '€'],
            'GBP' => ['name' => 'British Pound', 'symbol' => '£'],
            'AUD' => ['name' => 'Australian Dollar', 'symbol' => 'A$'],
            'JPY' => ['name' => 'Japanese Yen', 'symbol' => '¥'],
            'MXN' => ['name' => 'Mexican Peso', 'symbol' => '$'],
            'BRL' => ['name' => 'Brazilian Real', 'symbol' => 'R$'],
        ];
    }

    /**
     * Fallback exchange rates (mock data)
     */
    private function getFallbackRate($fromCurrency, $toCurrency): float
    {
        $rates = [
            'USD_CAD' => 1.35,
            'USD_EUR' => 0.92,
            'USD_GBP' => 0.79,
            'USD_AUD' => 1.53,
            'USD_JPY' => 149.50,
            'USD_MXN' => 17.15,
            'USD_BRL' => 4.95,
            
            'CAD_USD' => 0.74,
            'CAD_EUR' => 0.68,
            'CAD_GBP' => 0.58,
            
            'EUR_USD' => 1.09,
            'EUR_CAD' => 1.47,
            'EUR_GBP' => 0.86,
            
            'GBP_USD' => 1.27,
            'GBP_CAD' => 1.71,
            'GBP_EUR' => 1.16,
        ];

        $key = "{$fromCurrency}_{$toCurrency}";
        return $rates[$key] ?? 1.0;
    }
}
