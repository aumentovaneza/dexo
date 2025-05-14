<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\PokemonCard;
use App\Models\UserPokemonCollection;

class UserPokemonCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $pokemonCards = PokemonCard::all();

        // Sample tags
        $tags = [
            ['favorite', 'for deck'],
            ['for trade'],
            ['mint condition', 'rare'],
            ['graded', 'PSA 10'],
            ['damaged'],
            [],
        ];

        // Give each user a collection of 10-20 random cards
        foreach ($users as $user) {
            // Number of different cards in the collection
            $collectionSize = min(rand(10, 20), $pokemonCards->count());

            // Get random cards for this user
            $userCards = $pokemonCards->random($collectionSize);

            foreach ($userCards as $card) {
                // Each card can have quantity 1-10
                $quantity = rand(1, 10);

                // Assign random tags
                $randomTags = $tags[array_rand($tags)];

                UserPokemonCollection::create([
                    'user_id' => $user->id,
                    'pokemon_card_id' => $card->id,
                    'quantity' => $quantity,
                    'tags' => $randomTags,
                ]);
            }
        }
    }
}
