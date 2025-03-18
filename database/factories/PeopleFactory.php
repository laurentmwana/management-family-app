<?php

namespace Database\Factories;

use App\Enums\GenderEnum;
use App\Enums\RelationFamilyEnum;
use App\Models\Family;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\People>
 */
class PeopleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => $this->faker->name(),
            'image' => $this->faker->imageUrl(),
            'relation_family' => $this->faker->randomElement(RelationFamilyEnum::cases())->value,
            'gender' => $this->faker->randomElement(GenderEnum::cases())->value,
            'birth' => $this->faker->date(),
        ];
    }
}
