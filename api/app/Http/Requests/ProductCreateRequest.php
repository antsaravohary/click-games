<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use App\Enums\ProductType;

class ProductCreateRequest extends FormRequest
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
            'name'        => ['required', 'string', 'max:255'],
            'price'       => ['nullable', 'numeric'],
            'discount'    => ['nullable', 'numeric'],
            'sale_price'  => ['nullable', 'lte:price'],
            'type_id'     => ['nullable', 'exists:App\Models\Type,id'],
            'shop_id'     => ['nullable', 'exists:App\Models\Shop,id'],
            'user_id'     => ['nullable', 'exists:App\Models\User,id'],
            'product_type' => ['required', Rule::in([ProductType::SIMPLE, ProductType::VARIABLE])],
            'brand_id' => ['nullable', 'exists:App\Models\Brand,id'],
            'model_brand_id' => ['nullable', 'exists:App\Models\ModelBrand,id'],
            'categories'  => ['array'],
            'tags'        => ['array'],
            'variations'  => ['array'],
            'variation_options'  => ['array'],
            'quantity'    => ['nullable', 'integer'],
            'unit'        => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'sku'         => ['string'],
            'image'       => ['array'],
            'gallery'     => ['array'],
            'status'      => ['string', Rule::in(['publish', 'draft'])],
            'height'      => ['nullable', 'string'],
            'length'      => ['nullable', 'string'],
            'width'       => ['nullable', 'string'],
            'in_stock'    => ['boolean'],
            'is_taxable'  => ['boolean'],
            'mode' => ['required', Rule::in(['user-product', 'shop-product'])],
            'product_information' => ['nullable', 'array']
        ];
    }

    public function failedValidation(Validator $validator)
    {
        Log::debug($validator->errors());
        // TODO: Need to check from the request if it's coming from GraphQL API or not.
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
