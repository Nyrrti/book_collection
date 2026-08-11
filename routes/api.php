<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ReviewController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//GET
Route::get('/books', [BookController::class, 'index']);
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/reviews', [ReviewController::class, 'index']);

//POST
Route::post('/books', [BookController::class, 'store']);
Route::post('/authors', [AuthorController::class, 'store']);
Route::post('/reviews', [ReviewController::class, 'store']);

//PUT
Route::put('/books/{book}', [BookController::class, 'update']);
Route::put('/authors/{author}', [AuthorController::class, 'update']);
Route::put('/reviews/{review}', [ReviewController::class, 'update']);

//DELETE
Route::delete('/books/{book}', [BookController::class, 'destroy']);
Route::delete('/authors/{author}', [AuthorController::class, 'destroy']);
Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
