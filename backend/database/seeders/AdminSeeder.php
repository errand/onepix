<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\User::factory()->create([
             'name' => 'editor',
             'email' => 'asdf@asdf.asdf',
             'password' => '$2y$10$3nBNTMKmqmlGOpnMwNhybeldWRw6Jb5fAWBtzMy7ni/1NXNnPJBZ.', // asdfasdf
             'email_verified_at' => now(),
             'remember_token' => Str::random(10),

         ]);
    }
}
