<?php

namespace Database\Seeders;

use App\Models\MetaDeck;
use Illuminate\Database\Seeder;

class MetaDeckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $metaDecks = [
            [
                'format' => 'Standard',
                'source' => 'LimitlessTCG',
                'usage_rate' => 24.5,
                'win_rate' => 58.9,
                'deck_data' => json_encode([
                    'name' => 'Lost Zone Box',
                    'cards' => [
                        'Comfey' => 4,
                        'Sableye' => 3,
                        'Cramorant' => 3,
                        'Radiant Greninja' => 1,
                        'Tricky Gym' => 4,
                        'Colress\'s Experiment' => 4,
                        'Boss\'s Orders' => 3,
                    ]
                ]),
            ],
            [
                'format' => 'Standard',
                'source' => 'LimitlessTCG',
                'usage_rate' => 18.2,
                'win_rate' => 52.7,
                'deck_data' => json_encode([
                    'name' => 'Lugia VSTAR',
                    'cards' => [
                        'Lugia V' => 3,
                        'Lugia VSTAR' => 3,
                        'Archeops' => 2,
                        'Yveltal' => 2,
                        'Lumineon V' => 2,
                        'Professor\'s Research' => 4,
                        'Marnie' => 3,
                    ]
                ]),
            ],
            [
                'format' => 'Expanded',
                'source' => 'Tournament Results',
                'usage_rate' => 14.8,
                'win_rate' => 62.3,
                'deck_data' => json_encode([
                    'name' => 'Zoroark Control',
                    'cards' => [
                        'Zoroark-GX' => 4,
                        'Exeggcute' => 1,
                        'Oranguru' => 1,
                        'Crobat V' => 2,
                        'Team Flare Grunt' => 4,
                        'N' => 3,
                        'Guzma' => 3,
                    ]
                ]),
            ],
        ];

        foreach ($metaDecks as $deck) {
            MetaDeck::create($deck);
        }

        // Create a few more random meta decks
        MetaDeck::factory(5)->create();
    }
}
