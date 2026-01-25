<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Pokemon\Pokemon;

class TestPokemonSdk extends Command
{
    protected $signature = 'test:pokemon-sdk';
    protected $description = 'Test Pokemon TCG SDK';

    public function handle()
    {
        $this->info('Testing Pokemon TCG SDK...');
        
        // Configure the SDK
        Pokemon::ApiKey(config('services.pokemon_tcg.api_key'));
        Pokemon::Options([
            'timeout' => 300, // 5 minutes
            'connect_timeout' => 60, // 1 minute
        ]);

        try {
            $this->info('Testing pagination...');
            $pagination = Pokemon::Card()->pagination();
            $this->info('Total count: ' . $pagination->getTotalCount());
            
            $this->info('Testing single card fetch...');
            $cards = Pokemon::Card()->page(1)->pageSize(5)->all();
            $this->info('Cards count: ' . count($cards));
            
            if (!empty($cards)) {
                $firstCard = $cards[0];
                $this->info('First card ID: ' . $firstCard->id);
                $this->info('First card name: ' . $firstCard->name);
            }
            
        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            $this->error('Trace: ' . $e->getTraceAsString());
        }
        
        return 0;
    }
}
