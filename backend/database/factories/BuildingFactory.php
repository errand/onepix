<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Smknstd\FakerPicsumImages\FakerPicsumImagesProvider;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Building>
 */
class BuildingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(3),
            'description' => fake()->paragraphs(2, true),
            'image' => FakerPicsumImagesProvider::imageUrl(870, 400),
            'address' => fake()->streetAddress(),
            'deadline' => fake()->dateTimeBetween('-3 years', '+3 years'),
            'building_class' => fake()->randomElement([true, null]),
            'pricing_group' => fake()->randomElement(["Выше среднего", "Среднее", "Ниже среднего"]),
            'landscaping' => fake()->randomElement([true, null]),
            'decoration' => fake()->randomElement([true, null]),
            'parking' => fake()->randomElement([true, null]),
            'brick' => fake()->randomElement([true, null]),
            'river_view' => fake()->randomElement([true, null]),
            'forest' => fake()->randomElement([true, null]),
            'promo' => fake()->randomElement([true, null]),
            'no_cars' => fake()->randomElement([true, null]),
            'floor_height' => fake()->randomFloat(2, 2, 10),
            'storage_room' => fake()->randomElement([true, null]),
            'panorama_windows' => fake()->randomElement([true, null]),
            'special' => fake()->randomElement([true, null]),
        ];
    }
}
