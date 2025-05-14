<?php

namespace Database\Seeders;

use App\Models\Deck;
use App\Models\DeckCard;
use App\Models\PokemonCard;
use Illuminate\Database\Seeder;

class DeckCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $decks = Deck::all();
        $pokemonCards = PokemonCard::all();

        foreach ($decks as $deck) {
            // For each deck, add between 10-20 different cards
            $numberOfCardTypes = rand(10, 20);

            // Get random cards
            $randomCards = $pokemonCards->random($numberOfCardTypes);

            foreach ($randomCards as $card) {
                // Each card can have quantity 1-4
                $quantity = rand(1, 4);

                DeckCard::create([
                    'deck_id' => $deck->id,
                    'pokemon_card_id' => $card->id,
                    'quantity' => $quantity,
                ]);
            }
        }
    }
}
