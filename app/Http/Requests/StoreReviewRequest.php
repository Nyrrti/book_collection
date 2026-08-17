<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'rating' => 'required|integer|min:0|max:10',
            'book_id' => 'required|exists:books,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Add a title.',
            'title.max' => 'The title may contain max 255 characters.',
            'book_id.required' => 'Please select a book.',
            'book_id.exists' => 'The selected book does not exist.',
            'rating.required' => 'Please add a rating.',
            'rating.integer' => 'The rating must be a whole number.',
            'rating.min' => 'The rating cannot be lower than 0.',
            'rating.max' => 'The rating cannot be higher than 10.',
        ];
    }
}
