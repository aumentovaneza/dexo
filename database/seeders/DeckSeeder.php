<?php

namespace Database\Seeders;

use App\Models\Deck;
use App\Models\User;
use Illuminate\Database\Seeder;

class DeckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        // Create sample decks for each user
        foreach ($users as $user) {
            // Pikachu-focused deck
            Deck::create([
                'user_id' => $user->id,
                'name' => 'Pikachu Power',
                'format' => 'Standard',
                'notes' => 'A lightning-based deck centered around Pikachu variants.',
            ]);

            // Fire deck
            Deck::create([
                'user_id' => $user->id,
                'name' => 'Burn Everything',
                'format' => 'Expanded',
                'notes' => 'Fast-attacking fire deck with Charizard as the main attacker.',
            ]);

            // Create 1-3 additional random decks for each user
            $randomDeckCount = rand(1, 3);
            Deck::factory($randomDeckCount)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
