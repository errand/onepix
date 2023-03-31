<?php

namespace Database\Seeders;

use App\Models\Metro;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BuildingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Building::factory(100)
            ->hasAttached(
                Metro::factory()->count(3),
                ['distance' => fake()->randomNumber(3)]
            )
            ->create();
    }
}
