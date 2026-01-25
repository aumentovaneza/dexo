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
        $cards = $this->pokemonTCGApiService->getAllCards();

        foreach ($cards as $card) {
            $this->pokemonTCGApiService->storeCardInDatabase($card);
        }

        $this->info('All Pokemon TCG cards have been pulled and stored in the database.');
    }
    
}
