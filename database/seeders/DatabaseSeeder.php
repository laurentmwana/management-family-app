<?php

namespace Database\Seeders;

use App\Models\Family;
use App\Models\People;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        $families = Family::factory(10)->create();

        foreach ($families as $family) {
            People::factory(10)->create(['family_id' => $family->id]);
        }
    }
}
