<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Exceptions\PickbazarException;
use App\Http\Requests\RepairRequest;
use App\Models\Delivery;
use App\Repositories\RepairRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RepairController extends Controller

{
    private $repository;


    public function __construct(RepairRepository $repository)
    {
        $this->repository = $repository;
    }


    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user != null && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF))) {
            return $this->repository->with(['send_delivery', 'send_delivery.sender', 'model_brand', "model_brand.brand"])->paginate($limit);
        } else {

            return $this->repository->with(['model_brand', "model_brand.brand"])->where('user_id', '=', $user->id)->paginate($limit);
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
            return $this->repository->with(['sender_address', 'send_delivery', 'send_delivery.receiver', 'send_delivery.sender', 'return_delivery', 'return_delivery.receiver', 'return_delivery.sender', 'items', 'model_brand', "model_brand.brand", "model_brand.repair_prices"])->findOneWhere(['id' => $id]);
        } else {

            return $this->repository->with(['sender_address', 'send_delivery', 'send_delivery.receiver','return_delivery','return_delivery.receiver', 'return_delivery.sender', 'payment_info', 'send_delivery.sender', 'items', 'model_brand', "model_brand.brand"])->findOneWhere(['ref' => $id]);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param RepairRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(RepairRequest $request)
    {


        return $this->repository->store($request);
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
        $repair = $this->repository->find($id);
        if (!$user) {
            return [];
        }
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            switch ($request['action']) {
                case 'confirm_repair_receive':
                    DB::table("delivery")->where("id", "=", $repair->send_delivery_id)->update(["status" => "received"]);
                    $repair->status = "checking";
                    break;
                case 'checking_repair_items':
                    $repair->items()->sync($request['items']);
                    $amount=0;
                    
                    foreach ($repair->items as $key => $item) {
                       $amount=$amount+$item->pivot->total_price;
                    }
                    $repair->amount=$amount;
                    $repair->total_amount=$amount;
                    break;
                case 'confirm_repair_fixing':
                    $repair->status = "fixing";
                    break;
                case 'confirm_repair_fixed':
                    $repair->status = "fixed";
                    break;
                case 'confirm_repair_items':
                    $repair->status = "to_pay";
                    break;
                case 'shipping_return_packet':
                    $data = $request["shipping_data"];
                    $data["status"] = "dispached";
                    $data["sender_address_id"] = 1;
                    $data["receiver_address_id"] = $repair->send_delivery->sender->id;
                    $delivery = Delivery::create($data);
                    $repair->status = "return_dispached";
                    $repair->return_delivery_id = $delivery->id;
                    $repair->save();
                    break;

                default:

                    break;
            }
        } else {
            if ($request->user()->id != $repair->user_id) {
                return ["error 10001"];
            }
            switch ($request['action']) {
                case 'shipping_packet':
                    $delivery = Delivery::findOrFail($repair->send_delivery_id);
                    $delivery->update($request["shipping_data"]);
                    $delivery->update(["status" => "dispached"]);
                    $repair->status = "send_dispached";
                    break;
                default:
                    break;
            }
        }
        $repair->save();
        return $repair;
    }
}
