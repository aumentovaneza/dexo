<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\PokemonTCGApiService;

class TestRateLimiting extends Command
{
    protected $signature = 'test:rate-limiting';
    protected $description = 'Test Pokemon TCG API rate limiting';

    public function handle(PokemonTCGApiService $service)
    {
        $this->info('Testing Pokemon TCG API rate limiting...');
        $this->info('Current configuration:');
        $this->line('- Rate limit delay: ' . config('services.pokemon_tcg.rate_limit_delay') . ' seconds');
        $this->line('- Rate limit jitter: ' . config('services.pokemon_tcg.rate_limit_jitter') . ' seconds');
        $this->line('- Page size: ' . config('services.pokemon_tcg.page_size') . ' cards');
        $this->line('- Max retries: ' . config('services.pokemon_tcg.max_retries'));
        $this->line('- Max consecutive failures: ' . config('services.pokemon_tcg.max_consecutive_failures'));
        
        $this->newLine();
        $this->info('Testing single card fetch with rate limiting...');
        
        try {
            $startTime = microtime(true);
            $card = $service->getCard('base1-1'); // Charizard
            $endTime = microtime(true);
            
            $duration = round($endTime - $startTime, 2);
            
            if ($card) {
                $this->info('✅ Successfully fetched card: ' . ($card['name'] ?? 'Unknown'));
                $this->info('⏱️  Request took: ' . $duration . ' seconds');
            } else {
                $this->error('❌ Failed to fetch card');
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
        }
        
        $this->newLine();
        $this->info('Testing small batch fetch with rate limiting...');
        
        try {
            $startTime = microtime(true);
            $cards = $service->searchCards([], 1, 10); // 10 cards
            $endTime = microtime(true);
            
            $duration = round($endTime - $startTime, 2);
            
            if ($cards && count($cards) > 0) {
                $this->info('✅ Successfully fetched ' . count($cards) . ' cards');
                $this->info('⏱️  Request took: ' . $duration . ' seconds');
                $this->info('📊 Average per card: ' . round($duration / count($cards), 3) . ' seconds');
            } else {
                $this->error('❌ Failed to fetch cards');
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
        }
        
        return 0;
    }
}
