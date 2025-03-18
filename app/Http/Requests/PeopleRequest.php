<?php

namespace App\Http\Requests;

use App\Enums\GenderEnum;
use App\Enums\RelationFamilyEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PeopleRequest extends FormRequest
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
        $id = $this->input('id');

        return [
            'full_name' => [
                'bail', 'required', 'string', 'between:3,60',
            ],

            'family_id' => [
                'bail', 'required', 'exists:families,id',
            ],

            'birth' => [
                'bail', 'required', 'date', 'date_format:Y-m-d',
            ],

            'gender' => [
                'bail', 'required', Rule::enum(GenderEnum::class),
            ],

            'relation_family' => [
                'bail', 'required', Rule::enum(RelationFamilyEnum::class),
            ],

            'image' => [
                'bail', $id ? 'sometimes' : 'required', 'image', 'mimes:png,jpg', 'max:1024',
            ],
        ];
    }
}
