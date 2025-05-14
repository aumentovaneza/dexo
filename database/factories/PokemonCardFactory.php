<?php

namespace Database\Factories;

use App\Models\PokemonCard;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PokemonCard>
 */
class PokemonCardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PokemonCard::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $supertypes = ['Pokémon', 'Trainer', 'Energy'];
        $supertype = $this->faker->randomElement($supertypes);

        $subtypes = [
            'Pokémon' => ['Basic', 'Stage 1', 'Stage 2', 'VMAX', 'V', 'GX', 'EX', 'Tag Team'],
            'Trainer' => ['Item', 'Supporter', 'Stadium', 'Tool'],
            'Energy' => ['Basic', 'Special'],
        ];

        $types = ['Fire', 'Water', 'Grass', 'Lightning', 'Fighting', 'Psychic', 'Darkness', 'Metal', 'Fairy', 'Colorless', null];
        $sets = ['Scarlet & Violet', 'Sword & Shield', 'Sun & Moon', 'XY', 'Black & White'];
        $rarities = ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Ultra Rare', 'Secret Rare'];

        return [
            'name' => $supertype === 'Pokémon'
                ? $this->faker->unique()->randomElement(['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle', 'Jigglypuff', 'Mewtwo', 'Gengar', 'Gyarados', 'Eevee', 'Snorlax', 'Lucario', 'Gardevoir', 'Blaziken', 'Greninja', 'Rayquaza', 'Zekrom', 'Umbreon', 'Sylveon']) . ' ' . $this->faker->optional(0.7, '')->randomElement(['V', 'GX', 'EX', 'VMAX', 'VSTAR', ''])
                : ($supertype === 'Trainer'
                    ? $this->faker->randomElement(['Professor\'s Research', 'Switch', 'Poké Ball', 'Ultra Ball', 'Energy Retrieval', 'Boss\'s Orders', 'Quick Ball', 'Marnie', 'Leon', 'Pokémon Center Lady', 'Training Court', 'Brooklet Hill', 'Tool Jammer', 'Choice Belt'])
                    : $this->faker->randomElement(['Water Energy', 'Fire Energy', 'Grass Energy', 'Lightning Energy', 'Fighting Energy', 'Psychic Energy', 'Darkness Energy', 'Metal Energy', 'Fairy Energy', 'Double Colorless Energy', 'Rainbow Energy', 'Triple Acceleration Energy'])),
            'supertype' => $supertype,
            'subtype' => $this->faker->randomElement($subtypes[$supertype]),
            'type' => $supertype === 'Pokémon' || $supertype === 'Energy' ? $this->faker->randomElement($types) : null,
            'set' => $this->faker->randomElement($sets),
            'rarity' => $this->faker->randomElement($rarities),
            'image_url' => $this->faker->imageUrl(300, 420, 'pokemon'),
            'is_legal' => $this->faker->boolean(80), // 80% chance of being legal
        ];
    }
}
