<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Http\Requests\StoreBookRequest;
use App\Models\Book;

class BookController extends Controller
{
    public function index()
{
    return BookResource::collection(
        Book::with(['author', 'reviews'])->get()
    );
}

    public function store(StoreBookRequest $request) {
        $book = Book::create($request->validated());

        $books = Book::all();
        return BookResource::collection($books);
    }

    public function update(StoreBookRequest $request, Book $book) {
        $book->update($request->validated());

        $books = Book::all();
        return BookResource::collection($books);
    }

    // public function destroy(Book $book) {
    //     $book->delete();
    //     return response()->json(['message' => 'Book Deleted!']);
    // }

    public function destroy(Book $book)
    {
        if ($book->reviews()->exists()) {
            return response()->json([
                'message' => 'This book cannot be deleted because they still have linked reviews.'
            ], 422);
        }

        $book->delete();

        return response()->json([
            'message' => 'Book deleted!'
        ]);
    }
}

