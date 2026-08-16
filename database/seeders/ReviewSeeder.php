<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Book;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::all()->each(function ($book) {
            Review::factory()
                ->count(rand(0, 5))
                ->for($book)
                ->create();
        });
    }
}
