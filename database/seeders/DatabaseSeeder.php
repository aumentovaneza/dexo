<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call each seeder individually to isolate issues if any
        $this->call(UserSeeder::class);
        $this->call(PokemonCardSeeder::class);
        $this->call(DeckSeeder::class);
        $this->call(DeckCardSeeder::class);
        $this->call(MetaDeckSeeder::class);
        $this->call(UserPokemonCollectionSeeder::class);
    }
}
