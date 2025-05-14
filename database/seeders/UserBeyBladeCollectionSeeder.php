<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\BeybladePart;
use App\Models\UserBeybladeCollection;

class UserBeyBladeCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $beybladeParts = BeybladePart::all();

        // Sample tags
        $tags = [
            ['favorite', 'competitive'],
            ['for trade'],
            ['mint condition', 'rare'],
            ['customized'],
            ['damaged'],
            [],
        ];

        // Give each user a collection of parts
        foreach ($users as $user) {
            // Number of different parts in the collection
            $collectionSize = min(rand(5, 15), $beybladeParts->count());

            // Get random parts for this user
            $userParts = $beybladeParts->random($collectionSize);

            foreach ($userParts as $part) {
                // Each part can have quantity 1-8
                $quantity = rand(1, 8);

                // Assign random tags
                $randomTags = $tags[array_rand($tags)];

                UserBeybladeCollection::create([
                    'user_id' => $user->id,
                    'beyblade_part_id' => $part->id,
                    'quantity' => $quantity,
                    'tags' => $randomTags,
                ]);
            }
        }
    }
}
