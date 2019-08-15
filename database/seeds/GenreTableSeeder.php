<?php

use Illuminate\Database\Seeder;
use App\Genre;

class GenreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Genre::create([
            'name' => 'Comedy',
            'image' => 'data:image/jpeg;base64,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'

        ]);
        Genre::create([
            'name' => 'Science Fiction',
            'image' => 'data:image/jpeg;base64,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'

        ]);
        Genre::create([
            'name' => 'Action',
            'image' => 'data:image/jpeg;base64,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'

        ]);
        Genre::create([
            'name' => 'Adventure',
            'image' => 'data:image/jpeg;base64,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'

        ]);



        

    }
}
