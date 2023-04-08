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
            'building_class' => fake()->randomElement(["Элит", "Эконом", "Комфорт", "Бизнес"]),
            'pricing_group' => fake()->randomElement(["Выше среднего", "Среднее", "Ниже среднего"]),
            'floors' => fake()->randomNumber(2, true),
            'yard' => fake()->randomElement([true, null]),
            'finishing' => fake()->randomElement([true, null]),
            'parking' => fake()->randomElement([true, null]),
            'constructive' => fake()->randomElement(["Кирпично-монолитное", "Монолитное", "Кирпичное", "Сборно-монолитное"]),
            'river' => fake()->randomElement([true, null]),
            'forest' => fake()->randomElement([true, null]),
            'sale' => fake()->randomElement([true, null]),
            'without_cars' => fake()->randomElement([true, null]),
            'ceiling' => fake()->randomFloat(2, 2, 10),
            'pantries' => fake()->randomElement([true, null]),
            'windows' => fake()->randomElement([true, null]),
            'special' => fake()->randomElement([true, null]),
        ];
    }
}
