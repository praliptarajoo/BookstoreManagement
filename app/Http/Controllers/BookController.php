<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    public function findDetails($id) 
    {
        $data = Book::find($id);
        return response()->json($data);
    }
    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    public function store(Request $request)
    {
        $book = Book::create($request->all());
        return response()->json($book, 201);
    }

    public function update(Request $request, Book $book)
    {
        $book->update($request->all());
        return response()->json($book, 200);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $title = $request->input('title');
        $searchTerm = $request->input('genre');
        
        if ($title) {
            $books = Book::where('title', 'like', '%'.$title.'%')->get();
        } else {
            $books = Book::where(function ($query) use ($searchTerm) {
                $query->where('title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('author', 'like', '%' . $searchTerm . '%')
                    ->orWhere('genre', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%')
                    ->orWhere('isbn', 'like', '%' . $searchTerm . '%')
                    ->orWhere('published', 'like', '%' . $searchTerm . '%')
                    ->orWhere('publisher', 'like', '%' . $searchTerm . '%');
            })->get();
        } 

        return response()->json($books);
    }

    public function paginate(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $books = Book::paginate($perPage);
        return response()->json($books);
    }
}

