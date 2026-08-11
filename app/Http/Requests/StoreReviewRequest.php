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
            'rating' => 'required',
            'book_id' => 'required|exists:book,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Add a title.',
            'title.max' => 'The title may contain max 255 characters.',
            'book_id.required' => 'Please select a book.',
            'book_id.exists' => 'The selected book does not exist.',
        ];
    }
}
