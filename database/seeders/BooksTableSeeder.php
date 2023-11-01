<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Book; // Replace with your actual Book model namespace

class BooksTableSeeder extends Seeder
{
    public function run()
    {
        // Define the number of fake book records you wantBooksTableSeeder.php
        $quantity = 100;

        // Fetch fake book data from the Faker API
        $response = Http::get('https://fakerapi.it/api/v1/books', ['_quantity' => $quantity]);

        // Check if the API request was successful
        if ($response->successful()) {
            $books = $response->json();

            // Insert the fetched data into the 'books' table
            foreach ($books as $book) {
                dd($book);
                Book::create([
                    'title' => $book['title'],
                    'author' => $book['author'],
                    'genre' => $book['genre'],
                    'description' => $book['description'],
                    'isbn' => $book['isbn'],
                    'image' => $book['image'],
                    'published' => $book['published'],
                    'publisher' => $book['publisher'],
                ]);
            }
        }
    }
}

