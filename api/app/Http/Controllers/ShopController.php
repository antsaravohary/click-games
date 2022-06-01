<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Shop;
use App\Models\User;
use App\Models\Order;
use App\Mail\NewRefund;
use App\Models\Balance;
use App\Models\Product;
use App\Enums\Permission;
use App\Mail\OrderCancelled;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\StripeSubscription;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Repositories\ShopRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Exceptions\PickbazarException;
use App\Http\Requests\ShopCreateRequest;
use App\Http\Requests\ShopUpdateRequest;
use App\Http\Requests\UserCreateRequest;
use App\Models\Refund;
use Illuminate\Database\Eloquent\Collection;

class ShopController extends CoreController
{
    public $repository;

    public function __construct(ShopRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Shop[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?  $request->limit : 15;
        return $this->fetchShops($request)->paginate($limit)->withQueryString();
    }

    public function fetchShops(Request $request)
    {
        return $this->repository->withCount(['orders', 'products'])->with(['owner.profile'])->where('id', '!=', null);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param ShopCreateRequest $request
     * @return mixed
     */
    public function store(ShopCreateRequest $request)
    {
        if ($request->user()->hasPermissionTo(Permission::STORE_OWNER)) {
            return $this->repository->storeShop($request);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $slug
     * @return JsonResponse
     */
    public function show($slug, Request $request)
    {
        $shop = $this->repository
            ->with(['categories', 'owner', 'subscription'])
            ->withCount(['orders', 'products']);
        if ($request->user() && ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN) || $request->user()->shops->contains('slug', $slug))) {
            $shop = $shop->with('balance');
        }
        try {
            $shop = $shop->findOneByFieldOrFail('slug', $slug);
            return $shop;
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param ShopUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(ShopUpdateRequest $request, $id)
    {
        $request->id = $id;
        return $this->updateShop($request);
    }

    public function updateShop(Request $request)
    {
        $id = $request->id;
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN) || ($request->user()->hasPermissionTo(Permission::STORE_OWNER) && ($request->user()->shops->contains($id)))) {
            return $this->repository->updateShop($request, $id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        $request->id = $id;
        return $this->deleteShop($request);
    }

    public function deleteShop(Request $request)
    {
        $id = $request->id;
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN) || ($request->user()->hasPermissionTo(Permission::STORE_OWNER) && ($request->user()->shops->contains($id)))) {
            try {
                $shop = $this->repository->findOrFail($id);
            } catch (\Exception $e) {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
            }

            $balance = $shop->balance;
            if ($balance != null) {
                $balance->delete();
            }
            foreach ($shop->orders as $key => $order) {
             $this->cancellOrder($order->id, "Boutique supprimée");
            }
          /*  foreach ($shop->attributes as $key => $attribut) {
               $attribut->delete();
            }*/
            //return ["product"=>$shop->products,"shop"=>$shop];
            foreach ($shop->products as $key => $product) {
                /*DB::table('notices')->where('product_id',$product->id)->delete();
                DB::table('promotion_product')->where('product_id',$product->id)->delete();
                DB::table('attribute_product')->where('product_id',$product->id)->delete();
                DB::table('variation_options')->where('product_id',$product->id)->delete();*/
                $product->delete();
            }
            $shop->staffs()->detach();
            $shop->staffs()->delete();
            //DB::table("promotions")->where("shop_id",$shop->id)->delete();
            //DB::table("attributes")->where("shop_id",$shop->id)->delete();
           // DB::table("withdraws")->where("shop_id",$shop->id)->delete();
            $shop->delete();
            return $shop;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function approveShop(Request $request)
    {
        $id = $request->id;
        $admin_commission_rate = $request->admin_commission_rate;
        try {
            $shop = $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        $shop->is_active = true;
        $shop->save();
        $balance = Balance::firstOrNew(['shop_id' => $id]);
        $balance->admin_commission_rate = $admin_commission_rate;
        $balance->save();
        $subscription = StripeSubscription::create([
            'type' => "Gratuit",
            'current_period_end' => Carbon::now()->addDays(5)
        ]);
        $shop->stripe_subscription_id = $subscription->id;
        $shop->save();
        return $shop;
    }


    public function disApproveShop(Request $request)
    {
        $id = $request->id;
        try {
            $shop = $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }

        $shop->is_active = false;
        $shop->save();

        Product::where('shop_id', '=', $id)->update(['status' => 'draft']);

        return $shop;
    }

    public function addStaff(UserCreateRequest $request)
    {
        if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            $permissions = [Permission::CUSTOMER, Permission::STAFF];
            $user = User::create([
                'name'     => $request->first_name . " " . $request->last_name,
                'first_name'     => $request->first_name,
                'last_name'     => $request->last_name,
                'email'    => $request->email,
                'shop_id'  => $request->shop_id,
                'employer_id' => $request->user()->id,
                'password' => Hash::make($request->password),
            ]);
            if (isset($request->shops)) {
                $staff_shop = [];
                foreach ($request->shops as $key => $id) {
                    $staff_shop[$key] = [
                        'shop_id' => $id,
                        'user_id' => $user->id,
                        'owner_id' => $request->user()->id,
                    ];
                }
            }
            $user->managed_shops()->attach($staff_shop);

            $user->givePermissionTo($permissions);

            return true;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function removeStaff(Request $request, $id)
    {

        try {
            $staff = User::findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        if ($request->user()->hasPermissionTo(Permission::STORE_OWNER) || ($request->user()->hasPermissionTo(Permission::STORE_OWNER) && ($request->user()->shops->contains('id', $staff->shop_id)))) {
            $staff->managed_shops()->detach($staff->managed_shops);
            $staff->delete();
            return $staff;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function myShops(Request $request)
    {
        $user = $request->user;
        return $this->repository->where('owner_id', '=', $user->id)->get();
    }



    public function cancellOrder($order_id, $reason)
    {

        $order = Order::findOrfail($order_id);
        if(!$order){
            return false;
        }
        $order->shop_id = null;
        foreach ($order->products as $key => $product) {
            DB::table('order_product')->where('product_id',$product->id)->delete();
        }
      
        if ($order->status< 3) {
            $order->canceled = true;
            $order->status = 10;
        }
        $order->save();
        if($order->status==10){
            try {
                Mail::to($order->customer->email)->send(new OrderCancelled($order->ref));
            } catch (\Exception $e) {
            }
    
            $refund =  Refund::create([
                'amount' => $order->amount,
                'reason' => $reason,
                'order_id' => $order->id,
                'customer_id' => $order->customer_id,
    
            ]);
            try {
                Mail::to($order->customer->email)->send(new NewRefund($refund->id));
            } catch (\Exception $e) {
            }
        }

        
    }
}
