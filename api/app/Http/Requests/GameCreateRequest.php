<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GameCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
           "name"=>["required","string"],
           "description"=>["required","string"],
           "year"=>["required","numeric"],
           "quantity"=>["required","numeric"],
           "platform_id"=>["required","exists:App\Models\Platform,id"],
           "buy_price"=>["required","numeric"],
           "sale_price"=>["required","numeric"]
        ];
    }
}
