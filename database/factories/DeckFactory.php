<?php

namespace Database\Factories;

use App\Models\Deck;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deck>
 */
class DeckFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Deck::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $deckPrefixes = ['Turbo', 'Rogue', 'Meta', 'Budget', 'Championship', 'Competitive', 'Fun', 'Experimental', 'World Champion', 'Regional'];
        $deckThemes = ['Dragons', 'Psychic', 'Fire', 'Water', 'Electric', 'Evolution', 'Control', 'Aggro', 'Mill', 'VMAX', 'GX', 'EX', 'Tag Team', 'Basic', 'Legendary'];

        return [
            'user_id' => User::factory(),
            'name' => $this->faker->randomElement($deckPrefixes) . ' ' . $this->faker->randomElement($deckThemes),
            'format' => $this->faker->randomElement(['Standard', 'Expanded', 'Legacy', 'Unlimited']),
            'notes' => $this->faker->optional(0.7)->paragraph(),
        ];
    }
}
