<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepairRequest extends FormRequest
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
            'status'           => 'required|string',
            'user_id'          => 'nullable|exists:App\Models\Users,id',
            'amount'           => 'required|numeric',
            'paid_total'       => 'required|numeric',
            'total_amount'            => 'required|numeric',
            'items'            => 'required|array',
            'shipping_company'=>'nullable|string',
            'tracking_url'     => 'nullable|string',
            'tracking_number'  => 'nullable|string',
            'tracking_url'     => 'nullable|string',
            'weight'           => 'nullable|numeric',
            'model_brand_id'=>'required|exists:App\Models\ModelBrand,id'
        ];
    }
}
