<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Order;
use App\Models\Settings;
use App\Models\User;
use App\Repositories\OrderRepository;
use App\Enums\Permission;
use App\Events\OrderCreated;
use App\Exceptions\PickbazarException;
use App\Http\Requests\OrderCreateRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Mail\CodeRetrait;
use App\Mail\ConfirmRetraitClickCollect;
use App\Mail\OrderDispatched;
use App\Mail\OrderValidated;
use App\Models\CustomerProduct;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Stripe\Customer;

class OrderController extends CoreController
{
    public $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Order[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 10;
        return $this->fetchOrders($request)->paginate($limit)->withQueryString();
    }

    public function fetchOrders(Request $request)
    {
        $user = $request->user();

        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && (!isset($request->shop_id) || $request->shop_id === 'undefined')) {
            return $this->repository->with(['children', 'shop', 'children.shop', 'shipping',])->where('id', '!=', null)->where('parent_id', '=', null); //->paginate($limit);

        } else if ($this->repository->hasPermission($user, $request->shop_id)) {

            //if ($user && $user->hasPermissionTo(Permission::STORE_OWNER)) {

            return $this->repository->with(['children', 'shop', 'children.shop', 'shipping',])->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null); //->paginate($limit);

            /*  } elseif ($user && $user->hasPermissionTo(Permission::STAFF)) {
            
                return $this->repository->with('children')->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null); //->paginate($limit);
            }*/
        } else {
            return $this->repository->with(['children', 'shop', 'children.shop', 'shipping',])->where('customer_id', '=', $user->id)->where('parent_id', '=', null); //->paginate($limit);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param OrderCreateRequest $request
     * @return LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function store(OrderCreateRequest $request)
    {
        return $this->repository->storeOrder($request);
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
        try {
            $order = $this->repository->with(['products', 'payment_info', 'products.variations', 'customer.subscription', 'shop', 'products.variation_options', 'status', 'shipping', 'children.shop'])->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $order;
        } elseif (isset($order->shop_id)) {
            if ($this->repository->hasPermission($user, $order->shop_id)) {
                return $order;
            }
        } elseif ($user->id === $order->customer_id) {
            return $order;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }
    public function findByTrackingNumber(Request $request, $tracking_number)
    {
        $user = $request->user();
        try {
            $order = $this->repository->with(['products', 'status', 'shipping', 'children.shop', 'shop'])->findOneByFieldOrFail('ref', $tracking_number);
            if ($user->id === $order->customer_id || $user->can('super_admin')) {
                return $order;
            } else {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
            }
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param OrderUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(OrderUpdateRequest $request, $id)
    {
        $request->id = $id;
        $order = $this->updateOrder($request);
        return $order;
    }


    public function updateOrder(Request $request)
    {
        try {
            $order = $this->repository->findOrFail($request->id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        $user = $request->user();
        if($user->hasPermissionTo(Permission::CUSTOMER)){
                switch ($request["action"]) {
                    case 'packet_received':
                        return $this->changeOrderStatus($order,(object)["status"=>4]);
                        break;
                    
                    default:
                        return 200;
                        break;
                }
        }
        if (isset($order->shop_id)) {
            if ($this->repository->hasPermission($user, $order->shop_id)) {
                return $this->changeOrderStatus($order, $request);
            }
        } else if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $this->changeOrderStatus($order, $request);
        } else {
        
           
         throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function changeOrderStatus($order, $request)
    {

        if (isset($request->tracking_number)) {
            $order->tracking_number = $request->tracking_number;
        }
        if (isset($request->tracking_url)) {
            $order->tracking_url = $request->tracking_url;
        }
        if (isset($request->weight)) {
            $order->weight = $request->weight;
        }
        if (isset($request->shipping_company)) {
            $order->shipping_company = $request->shipping_company;
        }
        if (isset($request->status)) {
            $order->status = $request->status;
            if ($request->status === 2) {
                /*  try {
                    Mail::to($order->customer->email)->send(new Order($order));
                } catch (\Exception $e) {
                }*/
            } else if ($request->status === 3) {
                if (!$order->earning) {
                    $order->earning = true;
                    $this->repository->addShopIncome($order);
                }
                if ($order->mode_click_collect != "full") {
                    try {
                        Mail::to($order->customer->email)->send(new OrderDispatched($order));
                    } catch (\Exception $e) {
                    }
                }
            } else if ($request->status === 4) {
                foreach ($order->products as $key => $product) {
                    if (!$product->pivot->click_collect) {
                        CustomerProduct::create(["product_id" => $product->id, "user_id" => $order->customer_id, "status" => 1]);
                        DB::table("order_product")->where('id', $product->pivot->id)->update(["status" => "delivered"]);
                    }
                }
            }
        }


        if (isset($request->code_click_collect) && $request->code_click_collect != "") {
            $order->code_click_collect = $request->code_click_collect;
            foreach ($order->products as $key => $product) {
                if ($product->pivot->click_collect) {
                    DB::table("order_product")->where('id', $product->pivot->id)->update(["code_click_collect" => $order->code_click_collect]);
                }
            }
            try {
                Mail::to($order->customer->email)->send(new CodeRetrait($order));
            } catch (\Exception $e) {
            }
        }
        if (isset($request->click_collect_delivered)) {
            if ($request->click_collect_delivered) {
                if ($order->mode_click_collect == "full") {
                    $order->status = 4;
                }
                $order->click_collect_delivered = true;
                foreach ($order->products as $key => $product) {
                    if ($product->pivot->click_collect) {
                        DB::table("order_product")->where('id', $product->pivot->id)->update(["status" => "delivered"]);
                    }
                }
                $order->save();
                try {
                    Mail::to($order->customer->email)->send(new ConfirmRetraitClickCollect($order));
                } catch (\Exception $e) {
                }
            }
        }
        $order->save();
        try {
            $children = json_decode($order->children);
        } catch (\Throwable $th) {
            $children = $order->children;
        }
        if (is_array($children) && count($children) && isset($request->status)) {
            foreach ($order->children as $child_order) {
                $child_order->status = $request->status;
                $child_order->save();
            }
        }
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * @return JsonResponse
     */
    public function checkCodeClickCollect($code)
    {
        $order = Order::where('code_click_collect', 'like', $code)->firstOrFail();

        return $order;
    }
}
