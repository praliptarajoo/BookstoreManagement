<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin Routes
// Route::middleware('auth:api')->group(function () {
//     // Create a new book
//     Route::post('books', [BookController::class, 'store']);

//     // Update a book by ID
//     Route::put('books/{book}', [BookController::class, 'update']);

//     // Delete a book by ID
//     Route::delete('books/{book}', [BookController::class, 'destroy']);
// });

// Create a new book
Route::post('books', [BookController::class, 'store']);

// Update a book by ID
Route::put('books/{book}', [BookController::class, 'update']);

// Delete a book by ID
Route::delete('books/{book}', [BookController::class, 'destroy']);

// Customer Routes
Route::get('books', [BookController::class, 'index']);

// Search and filter books
Route::get('books/search', [BookController::class, 'search']);

// Implement pagination for listing books
Route::get('books/paginate', [BookController::class, 'paginate']);

Route::get('books/{id}', [BookController::class, 'findDetails']);

