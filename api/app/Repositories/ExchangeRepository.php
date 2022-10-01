<?php

namespace App\Repositories;

use App\Models\Address;
use App\Models\CustomerProduct;
use App\Models\Delivery;
use App\Models\Exchange;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Models\Product;
use Illuminate\Http\Request;

/**
 * Class ExchangeRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ExchangeRepository extends BaseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Exchange::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function store(Request $request)
    {

        $user = $request->user();
        $shop_product = Product::find($request["shop_product_id"]);
        $customer_product = CustomerProduct::find($request["customer_product_id"]);
        /* $amount = $shop_product->pirce - $customer_product->product->price;
        if ($amount < 10) {
            $amount = 10;
        }*/
        if ($user->subscription->credit > 0) {
            $amount = 0;
        } else {
            $amount = 10;
        }
        $delivery = Delivery::create([
            'sender_address_id' => Address::where("customer_id", $request->user()->id)->first()->id,
            'company' => "",
            'receiver_address_id' => 1,
            'tracking_number' => "",
            'tracking_url' => "",
            'status' => "pending"
        ]);
        $data["send_delivery_id"] = $delivery->id;
        $user->subscription->credit = $user->subscription->credit - 1;
        $user->subscription->save();
        $exchange = $this->create([
            "customer_product_id" => $customer_product->id,
            "send_delivery_id"=>$delivery->id,
            "shop_product_id" => $shop_product->id,
            "amount" => $amount,
            "status" => "pending",
            "obs" => "",
            "user_id" => $request->user()->id,
            "credit" => 1,

        ]);
        $exchange->ref = 'CE' .  $exchange->created_at->format('dm') .  $exchange->created_at->format("Y") . $exchange->id;
        $exchange->save();
        return $exchange;
    }
}
