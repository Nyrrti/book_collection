<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\AuthorResource;
use App\Http\Requests\StoreAuthorRequest;
use App\Models\Author;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Exceptions\HttpResponseException;


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

    // public function destroy(Author $author)
    // {
    //     if ($author->books()->exists()) {
    //         return response()->json([
    //             'message' => 'This author cannot be deleted because they still have linked books.'
    //         ], 422);
    //     }

    //     $author->delete();

    //     return response()->json([
    //         'message' => 'Author deleted!'
    //     ]);
    // }

    public function destroy(Author $author)
    {
        if ($author->books()->exists()) {
            throw new HttpResponseException(response()->json([
                'errors' => [],
                'message' => 'This author cannot be deleted because they still have linked books.'
            ], 422));
        }

        $author->delete();
    }
}




