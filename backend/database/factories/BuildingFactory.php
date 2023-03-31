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
            'building_class' => fake()->randomElement(["Элитное жильё", "Эконом класс", "Комфорт клсс", "Бизнес класс"]),
            'pricing_group' => fake()->randomElement(["Выше среднего", "Среднее", "Ниже среднего"]),
            'landscaping' => fake()->randomElement([1, 0]),
            'decoration' => fake()->randomElement([1, 0]),
            'parking' => fake()->randomElement([1, 0]),
            'constructive' => fake()->randomElement(["Кирпично-монолитное", "Монолитное", "Кирпичное", "Сборно-монолитное"]),
            'river_view' => fake()->randomElement([1, 0]),
            'forest' => fake()->randomElement([1, 0]),
            'promo' => fake()->randomElement([1, 0]),
            'no_cars' => fake()->randomElement([1, 0]),
            'floor_height' => fake()->randomFloat(2, 2, 10),
            'storage_room' => fake()->randomElement([1,0]),
            'panorama_windows' => fake()->randomElement([1,0]),
            'special' => fake()->randomElement([1,0]),
        ];
    }
}
