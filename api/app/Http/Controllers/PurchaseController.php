<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Exceptions\PickbazarException;
use App\Models\Message;
use App\Models\Purchase;
use App\Models\PurchaseProduct;
use App\Repositories\PurchaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    private $repository;

    public function __construct(PurchaseRepository $repository)
    {
        $this->repository = $repository;
    }
    /**
     * Display the specified resource.
     *
     * @param $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            return $this->repository->with(["products", 'messages', 'messages.user', 'messages.user.profile', 'address'])->find($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user != null && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF))) {
            return $this->repository->with(["user"])->paginate($limit);
        } else {

            return $this->repository->with(['products'])->where('user_id', '=', $user->id)->paginate($limit);
        }
    }
    public function store(Request $request)
    {

        return  $this->repository->store($request);
    }
    public function update(Request $request, $id)
    {
        $purchase = Purchase::findOrFail($id);
        switch ($request["action"]) {
            case 'client_accept':

                //return $purchase->products;
                $total = 0;
                foreach ($request["products"] as $key => $product) {
                    $purchase_product = PurchaseProduct::findOrFail($product["id"]);
                    $purchase_product->update([
                        "price" => $product["price"],
                        "total_price" => $product["price"] * $product["quantity"]
                    ]);
                    $purchase_product->save();
                    $total += $purchase_product->total_price;
                }
                $purchase->total = $total;
                $purchase->amount = $total;

                $purchase->status = "confirmed";
                $message = Message::findOrFail($request["message_id"]);
                $message->data_is_avalaible = false;
                $message->save();
                $purchase->save();
                Message::create([
                    "text" => $request->user()->name . " accept l'offre",
                    "purchase_id" => $purchase->id
                ]);
                break;
            case 'admin_accept':
                $purchase->status = "confirmed";
                DB::table("messages")->where("purchase_id","=",$purchase->id)->where("type","=","PPP")->update(["data_is_avalaible"=>false]);
                $purchase->save();
                Message::create([
                    "text" => "Nous acceptons cette  vente",
                    "purchase_id" => $purchase->id
                ]);
            case "shipping":
                $purchase->shipping_company = $request["shipping_data"]["company"];
                $purchase->tracking_number = $request["shipping_data"]["tracking_number"];
                $purchase->tracking_url = $request["shipping_data"]["tracking_url"];
                $purchase->weight = $request["shipping_data"]["weight"];
                $purchase->status = "dispatched";
                $purchase->address_id=1;
                $purchase->save();
            case "packet_received":
                $purchase->status = "received";
                $purchase->save();
            default:
                # code...
                break;
        }
    }
}
