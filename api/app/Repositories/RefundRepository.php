<?php

namespace App\Repositories;

use App\Mail\NewRefund;
use App\Mail\NewWithdraw;
use App\Mail\OrderCancelled;
use App\Models\Refund;
use App\Models\Article;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class RefundRepository extends BaseRepository
{


    protected $fieldSearchable = [
        'shop_id'=>'like',
        'status'=>'like'
    ];
    protected $dataArray = [
        'amount',
        'shop_id',
        'reason',
        'order_id',
    ];
    /**
     * Configure the Model
     **/
    public function model()
    {
        return Refund::class;
    }
    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function store(Request $request)
    {
        $data = $request->only($this->dataArray);
        $order = Order::findOrfail($data['order_id']);
        $order->canceled = true;
        $order->status = 10;
        $order->save();
        try {
            Mail::to($order->customer->email)->send(new OrderCancelled($order->ref));
        } catch (\Exception $e) {
        }
       
       $refund=  $this->create([
            'amount' => $data['amount'],
            'order_id' => $order->id,
            'customer_id' => $order->customer_id,

        ]);
        try {
            Mail::to($order->customer->email)->send(new NewRefund($refund->id));
        } catch (\Exception $e) {
        }
       
    return $refund;
    }

    
}
