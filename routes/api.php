<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//GET
Route::get('/books', [BookController::class, 'index']);
Route::get('/authors', [AuthorController::class, 'index']);

//POST
Route::post('/books', [BookController::class, 'store']);
Route::post('/authors', [AuthorController::class, 'store']);

//PUT
Route::put('/books/{book}', [BookController::class, 'update']);
Route::put('/authors/{author}', [AuthorController::class, 'update']);

//DELETE
Route::delete('/books/{book}', [BookController::class, 'destroy']);
Route::delete('/authors/{author}', [AuthorController::class, 'destroy']);