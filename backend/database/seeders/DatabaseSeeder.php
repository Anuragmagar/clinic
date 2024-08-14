<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Specialization;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Specialization::factory(50)->create();
        // User::factory(60)->create();
        // Doctor::factory()
        //     ->count(50)
        //     ->create();
        Patient::factory()
            ->count(50)
            ->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
