<?php

namespace Database\Factories;

use App\Models\MetaDeck;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MetaDeck>
 */
class MetaDeckFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MetaDeck::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $deckNames = [
            'Lugia VSTAR',
            'Lost Zone Box',
            'Mew VMAX',
            'Arceus VSTAR',
            'Palkia VSTAR',
            'Kyurem VMAX',
            'Rapid Strike Urshifu',
            'Single Strike Urshifu',
            'Shadow Rider Calyrex',
            'Ice Rider Calyrex',
            'Zacian V',
            'Eternatus VMAX',
            'Mewtwo V-Union',
            'Durant Mill'
        ];

        $randomDeckName = $this->faker->randomElement($deckNames);

        // Generate fake deck data
        $deckData = [
            'name' => $randomDeckName,
            'cards' => [],
        ];

        // Add between 10-15 cards to the deck
        $numCards = $this->faker->numberBetween(10, 15);
        $cardNames = [
            'Lugia V',
            'Lugia VSTAR',
            'Mew V',
            'Mew VMAX',
            'Arceus V',
            'Arceus VSTAR',
            'Gengar VMAX',
            'Darkrai VSTAR',
            'Pikachu VMAX',
            'Charizard V',
            'Professor\'s Research',
            'Marnie',
            'Boss\'s Orders',
            'Quick Ball',
            'Ultra Ball',
            'Energy Switch',
            'Path to the Peak',
            'Training Court',
            'Switch',
            'Escape Rope'
        ];

        for ($i = 0; $i < $numCards; $i++) {
            $cardName = $this->faker->randomElement($cardNames);
            $quantity = $this->faker->numberBetween(1, 4);
            $deckData['cards'][$cardName] = $quantity;
        }

        return [
            'format' => $this->faker->randomElement(['Standard', 'Expanded']),
            'source' => $this->faker->randomElement(['LimitlessTCG', 'Tournament Results', 'PlayPokemon', 'Regional Championship']),
            'usage_rate' => $this->faker->randomFloat(2, 0.5, 35),
            'win_rate' => $this->faker->randomFloat(2, 40, 75),
            'deck_data' => $deckData,
        ];
    }
}
