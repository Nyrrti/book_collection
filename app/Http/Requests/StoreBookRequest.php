<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;

class StoreBookRequest extends BaseFormRequest
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
            'summary' => 'required|string',
            'author_id' => 'required|exists:authors,id'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Add a title.',
            'title.max' => 'The title may contain max 255 characters.',
            'author_id.required' => 'Please select an author.',
            'author_id.exists' => 'The selected author does not exist.',
        ];
    }
}
