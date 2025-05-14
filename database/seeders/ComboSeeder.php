<?php

namespace Database\Seeders;

use App\Models\BeybladePart;
use App\Models\Combo;
use App\Models\User;
use Illuminate\Database\Seeder;

class ComboSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        // Get parts by type
        $layers = BeybladePart::where('part_type', 'Layer')->get();
        $disks = BeybladePart::where('part_type', 'Disk')->get();
        $drivers = BeybladePart::where('part_type', 'Driver')->get();

        // Create 2-5 combos for each user
        foreach ($users as $user) {
            $comboCount = rand(2, 5);

            for ($i = 0; $i < $comboCount; $i++) {
                Combo::create([
                    'user_id' => $user->id,
                    'layer_id' => $layers->random()->id,
                    'disk_id' => $disks->random()->id,
                    'driver_id' => $drivers->random()->id,
                    'notes' => 'Custom combo #' . ($i + 1) . ' for ' . $user->name,
                ]);
            }
        }
    }
}
