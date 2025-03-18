<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FamilyRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('family'); // Récupère l'ID depuis la route

        return [
            'name' => [
                'bail', 'required', 'string', 'between:3,255'
            ],

            'description' => [
                'bail', 'nullable', 'string', 'max:8000',
            ],
        ];
    }
}
