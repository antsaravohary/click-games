<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use App\Models\Balance;
use App\Enums\Permission;
use Illuminate\Http\Request;
use App\Enums\WithdrawStatus;
use App\Repositories\RefundRepository;
use Faker\Provider\ar_JO\Person;

class RefundController extends Controller
{
    //
    private $repository;
    public function __construct(RefundRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user != null && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF))) {
            return $this->repository->with(['customer', 'order'])->paginate($limit);
        } else {

            return $this->repository->with(['customer', 'order', 'order.shop'])->where('customer_id', '=', $user->id)->paginate($limit);
        }
    }
    public function store(Request $request)
    {
        if ($this->repository->hasPermission($request->user(), $request['shop_id'])) {
            return $this->repository->store($request);
        }
    }
    public function finishRefund(Request $request)
    {
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
            $refund = Refund::findOrfail($request['id']);
            $order = $refund->order;
            $balance = Balance::where('shop_id', '=', $order->shop_id)->first();
            if ($balance && $order->earning) {
                $balance->total_earnings = $balance->total_earnings - $refund->amount;
                $balance->current_balance = $balance->current_balance - $refund->amount;
                $balance->save();
            }

            $order->status = 12;
            $order->save();
            $refund->status = WithdrawStatus::APPROVED;
            $refund->save();
            return $refund;
        }
    }
}
