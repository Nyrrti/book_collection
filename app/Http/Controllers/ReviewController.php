<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Http\Requests\StoreReviewRequest;
use App\Models\Review;
class ReviewController extends Controller
{

    public function index() {
        return ReviewResource::collection(Review::all());
    }

    //CREATE
    public function store(StoreReviewRequest $request) {
        $review = Review::create($request->validated());

        $reviews = Review::all();
        return ReviewResource::collection($reviews);
    }

    //UPDATE
    public function update(StoreReviewRequest $request, Review $review) {
        $review->update($request->validated());

        $reviews = Review::all();
        return ReviewResource::collection($reviews);
    }
    
    //DELETE
    public function destroy(Review $review) {
        
        return response()->json([
            'message' => 'Review Deleted!',
            'isDeleted' => ($review->delete() === true )
        ]);
    }
}
