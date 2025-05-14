<?php

namespace Database\Seeders;

use App\Models\BeybladePart;
use Illuminate\Database\Seeder;

class BeybladePartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $beybladeParts = [
            // Layers
            [
                'name' => 'Valkyrie',
                'part_type' => 'Layer',
                'attack' => 8,
                'defense' => 5,
                'stamina' => 3,
                'image_url' => 'https://example.com/valkyrie.png',
            ],
            [
                'name' => 'Spriggan',
                'part_type' => 'Layer',
                'attack' => 7,
                'defense' => 7,
                'stamina' => 5,
                'image_url' => 'https://example.com/spriggan.png',
            ],
            [
                'name' => 'Dragoon',
                'part_type' => 'Layer',
                'attack' => 9,
                'defense' => 4,
                'stamina' => 2,
                'image_url' => 'https://example.com/dragoon.png',
            ],

            // Disks
            [
                'name' => 'Heavy',
                'part_type' => 'Disk',
                'attack' => 3,
                'defense' => 7,
                'stamina' => 8,
                'image_url' => 'https://example.com/heavy.png',
            ],
            [
                'name' => '00',
                'part_type' => 'Disk',
                'attack' => 5,
                'defense' => 5,
                'stamina' => 5,
                'image_url' => 'https://example.com/00.png',
            ],

            // Drivers
            [
                'name' => 'Accel',
                'part_type' => 'Driver',
                'attack' => 7,
                'defense' => 2,
                'stamina' => 4,
                'image_url' => 'https://example.com/accel.png',
            ],
            [
                'name' => 'Survive',
                'part_type' => 'Driver',
                'attack' => 2,
                'defense' => 5,
                'stamina' => 9,
                'image_url' => 'https://example.com/survive.png',
            ],
            [
                'name' => 'Evolution',
                'part_type' => 'Driver',
                'attack' => 6,
                'defense' => 6,
                'stamina' => 6,
                'image_url' => 'https://example.com/evolution.png',
            ],
        ];

        foreach ($beybladeParts as $part) {
            BeybladePart::create($part);
        }

        // Create additional random parts
        BeybladePart::factory(15)->create();
    }
}
