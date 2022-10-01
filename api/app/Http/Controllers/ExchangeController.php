<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Models\Delivery;
use App\Repositories\ExchangeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExchangeController extends Controller
{
    private $repository;

    public function __construct(ExchangeRepository $exchangeRepository)
    {
        $this->repository = $exchangeRepository;
    }
    public function store(Request $request)
    {
        return $this->repository->store($request);
    }

    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user != null && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF))) {
            return $this->repository->with(['customer_product', 'shop_product', 'customer_product.product', 'customer_product.product.categories', 'shop_product.categories', 'user'])->paginate($limit);
        } else {

            return $this->repository->with(['customer_product', 'shop_product', 'customer_product.product', 'customer_product.product.categories', 'shop_product.categories'])->where('user_id', '=', $user->id)->paginate($limit);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) {
            return [];
        }
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $this->repository->with(['sender_address', 'send_delivery', 'send_delivery.receiver', 'return_delivery', 'return_delivery.receiver', 'return_delivery.sender', 'send_delivery.sender', 'customer_product', 'shop_product', 'customer_product.product', 'customer_product.product.categories', 'shop_product.categories', 'payment_info'])->findOneWhere(['id' => $id]);
        } else {

            return $this->repository->with(['sender_address', 'send_delivery', 'send_delivery.receiver', 'return_delivery', 'return_delivery.receiver', 'return_delivery.sender', 'send_delivery.sender', 'customer_product', 'shop_product', 'customer_product.product', 'customer_product.product.categories', 'shop_product.categories', 'payment_info'])->findOneWhere(['id' => $id]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return array
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        $exchange = $this->repository->find($id);
        if (!$user) {
            return [];
        }
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            switch ($request['action']) {

                case 'confirm_exchange':
                    $exchange->customer_product->status = 0;
                    $exchange->customer_product->save();
                    $exchange->status = "confirmed";
                    $exchange->amount = $request["amount"];
                    break;
                case 'confirm_exchange_receive':
                    $exchange->status = "checking";
                    DB::table("delivery")->where("id", "=", $exchange->send_delivery_id)->update(["status" => "received"]);
                    break;
                case 'confirm_exchange_checked':
                    $exchange->status = "checked";
                    $exchange->status = "paid";
                    $delivery = Delivery::create([
                        'sender_address_id' => 1,
                        'company' => "",
                        'receiver_address_id' => $exchange->send_delivery->sender_address_id,
                        'tracking_number' => "",
                        'tracking_url' => "",
                        'status' => "pending"
                    ]);
                    $exchange->return_delivery_id = $delivery->id;
                    break;
                case 'shipping_return_packet': {
                    $exchange->status = "return_dispatched";
                    DB::table("delivery")->where("id", "=", $exchange->return_delivery_id)->update(["status" => "dispatch"]);
                    }
                default:
                    break;
            }
        } else {
            if ($request->user()->id != $exchange->user_id) {
                return ["error 10001"];
            }
            switch ($request['action']) {
                case 'shipping_packet':
                    $delivery = Delivery::findOrFail($exchange->send_delivery_id);
                    $delivery->update($request["shipping_data"]);
                    $delivery->update(["status" => "dispached"]);
                    $exchange->status = "send_dispached";
                    break;
                case 'cancelled':

                    $exchange->customer_product->status = 1;
                    $exchange->customer_product->save();
                    $exchange->status = "cancelled";
                    break;
                default:
                    break;
            }
        }
        $exchange->save();
        return $exchange;
    }
}
