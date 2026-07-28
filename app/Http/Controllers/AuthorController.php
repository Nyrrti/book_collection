<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\AuthorResource;
use App\Http\Requests\StoreAuthorRequest;
use App\Models\Author;


class AuthorController extends Controller
{
    public function index() {
        return AuthorResource::collection(Author::all());
    }

    public function store(StoreAuthorRequest $request) {
        $author = Author::create($request->validated());

        $authors = Author::all();
        return AuthorResource::collection($authors);
    }

    public function update(StoreAuthorRequest $request, Author $author) {
    $author->update($request->validated());

    $authors = Author::all();
        return AuthorResource::collection($authors);
    }

    public function destroy(Author $author)
    {
        if ($author->books()->exists()) {
            return response()->json([
                'message' => 'This author cannot be deleted because they still have linked books.'
            ], 422);
        }

        $author->delete();

        return response()->json([
            'message' => 'Author deleted!'
        ]);
    }

}




