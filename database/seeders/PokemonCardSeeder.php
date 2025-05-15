<?php

namespace Database\Seeders;

use App\Models\PokemonCard;
use Illuminate\Database\Seeder;

class PokemonCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pokemonCards = [
            [
                'name' => 'Pikachu V',
                'supertype' => 'Pokémon',
                'subtype' => 'Basic',
                'type' => 'Lightning',
                'set' => 'Sword & Shield',
                'rarity' => 'Ultra Rare',
                'image_url' => 'https://images.pokemontcg.io/swsh4/44.png',
                'is_legal' => true,
            ],
            [
                'name' => 'Charizard VMAX',
                'supertype' => 'Pokémon',
                'subtype' => 'VMAX',
                'type' => 'Fire',
                'set' => 'Darkness Ablaze',
                'rarity' => 'Secret Rare',
                'image_url' => 'https://images.pokemontcg.io/swsh3/20.png',
                'is_legal' => true,
            ],
            [
                'name' => 'Professor\'s Research',
                'supertype' => 'Trainer',
                'subtype' => 'Supporter',
                'type' => null,
                'set' => 'Sword & Shield',
                'rarity' => 'Uncommon',
                'image_url' => 'https://images.pokemontcg.io/swsh1/178.png',
                'is_legal' => true,
            ],
            [
                'name' => 'Double Colorless Energy',
                'supertype' => 'Energy',
                'subtype' => 'Special',
                'type' => 'Colorless',
                'set' => 'XY',
                'rarity' => 'Uncommon',
                'image_url' => 'https://images.pokemontcg.io/xy/130.png',
                'is_legal' => false,
            ],
            [
                'name' => 'Mewtwo EX',
                'supertype' => 'Pokémon',
                'subtype' => 'EX',
                'type' => 'Psychic',
                'set' => 'Next Destinies',
                'rarity' => 'Ultra Rare',
                'image_url' => 'https://images.pokemontcg.io/bw4/54.png',
                'is_legal' => false,
            ],
        ];

        foreach ($pokemonCards as $card) {
            PokemonCard::create($card);
        }
    }
}
