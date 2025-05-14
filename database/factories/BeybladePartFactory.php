<?php

namespace Database\Factories;

use App\Models\BeybladePart;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BeybladePart>
 */
class BeybladePartFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = BeybladePart::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $partTypes = ['Layer', 'Disk', 'Driver'];
        $partType = $this->faker->randomElement($partTypes);

        $namesByType = [
            'Layer' => ['Galaxy', 'Storm', 'Thunder', 'Cosmic', 'Ultimate', 'Blaze', 'Phantom', 'Hyper', 'Turbo', 'Infinity', 'Xeno', 'Shadow', 'Omega', 'Alpha', 'Demon'],
            'Disk' => ['7', '00', '10', '2', '4', '5', 'Wing', 'Star', 'Vortex', 'Outer', 'Meteor', 'Gravity', 'Boost', 'Generate'],
            'Driver' => ['Assault', 'Absorb', 'Orbit', 'Volcanic', 'Blow', 'Drift', 'Anchor', 'Power', 'Bearing', 'Survive', 'Charge', 'Impact', 'Needle'],
        ];

        return [
            'name' => $this->faker->randomElement($namesByType[$partType]),
            'part_type' => $partType,
            'attack' => $this->faker->numberBetween(1, 10),
            'defense' => $this->faker->numberBetween(1, 10),
            'stamina' => $this->faker->numberBetween(1, 10),
            'image_url' => $this->faker->imageUrl(200, 200, 'beyblade'),
        ];
    }
}
