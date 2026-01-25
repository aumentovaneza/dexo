<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\PokemonTCGApiService;

class PullPokemonTCGCards extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:pull-pokemon-tcg-cards';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pull all Pokemon TCG cards from the API';

    private $pokemonTCGApiService;

    public function __construct(PokemonTCGApiService $pokemonTCGApiService)
    {
        parent::__construct();
        $this->pokemonTCGApiService = $pokemonTCGApiService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to fetch Pokemon TCG cards...');
        
        $cards = $this->pokemonTCGApiService->getAllCards();
        
        if (empty($cards)) {
            $this->error('No cards were fetched from the API.');
            return 1;
        }

        $this->info('Fetched ' . count($cards) . ' cards. Storing in database...');
        
        $progressBar = $this->output->createProgressBar(count($cards));
        $progressBar->start();

        foreach ($cards as $card) {
            $this->pokemonTCGApiService->storeCardInDatabase($card);
            $progressBar->advance();
        }

        $progressBar->finish();
        $this->newLine();
        $this->info('All Pokemon TCG cards have been pulled and stored in the database.');
        
        return 0;
    }
    
}
