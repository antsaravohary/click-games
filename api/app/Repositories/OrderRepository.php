<?php


namespace App\Repositories;

use App\Models\Shop;
use App\Models\User;
use App\Models\Order;
use App\Mail\NewOrder;
use App\Models\Coupon;
use App\Models\Balance;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Events\OrderCreated;
use App\Models\VariationOption;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;
use App\Exceptions\PickbazarException;
use App\Mail\OrderValidated;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Ignited\LaravelOmnipay\Facades\OmnipayFacade as Omnipay;

class OrderRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'tracking_number' => 'like',
        'ref' => 'like',
        'status' => 'like',
        'shop_id',
    ];
    /**
     * @var string[]
     */
    protected $dataArray = [
        'tracking_number',
        'shipping_company',
        'tracking_url',
        'relay_point',
        'ref',
        'customer_id',
        'shop_id',
        'status',
        'amount',
        'sales_tax',
        'paid_total',
        'total',
        'delivery_time',
        'payment_gateway',
        'discount',
        'shipping_class_id',
        'coupon_id',
        'payment_id',
        'logistics_provider',
        'billing_address',
        'shipping_address',
        'delivery_fee',
        'customer_contact'
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Order::class;
    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */
    public function storeOrder($request)
    {
        $request['tracking_number'] = Str::random(12);
        $request['customer_id'] = $request->user()->id;
        $discount = $this->calculateDiscount($request);
        if ($discount) {
            $request['paid_total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'] - $discount;
            $request['total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'] - $discount;
            $request['discount'] =  $discount;
        } else {
            $request['paid_total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'];
            $request['total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'];
        }

        $payment_gateway = $request['payment_gateway'];
        $order = $this->createOrder($request);
        $this->processProducts($order->order);
        return $order;
        /*switch ($payment_gateway) {
            case 'cod':
                // Cash on Delivery no need to capture payment
                return $this->createOrder($request);
                break;
            case 'paypal':
                // For default gateway no need to set gateway
                Omnipay::setGateway('paypal');
                break;
        }*/

        /*$response = $this->capturePayment($request);
        if ($response->isSuccessful()) {
            $payment_id = $response->getTransactionReference();
            $request['payment_id'] = $payment_id;
            $order = $this->createOrder($request);
            return $order;
        } elseif ($response->isRedirect()) {
            return $response->getRedirectResponse();
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.PAYMENT_FAILED');
        }*/
    }
    /** 
     * @param $request
     * @return array
     */
    public function prepareOrder($data, $user)
    {
        $orderInput = $data['orderInput'];
        $orderInput['tracking_number'] = NULL;
        $orderInput['customer_id'] = $user->id;
        $orderInput["mode"] = ($user->subscription != null && $user->subscription->status) ? "CGP_SUBSCRIBER" : ($data["clickGamePlus"] ? "CGP_NEW" : "NONE");
        $discount = $this->calculateDiscount($orderInput);
        if ($discount) {
            $orderInput['paid_total'] = $orderInput['amount'] + $orderInput['sales_tax'] + $orderInput['delivery_fee'] - $orderInput;
            $orderInput['total'] = $orderInput['amount'] + $orderInput['sales_tax'] + $orderInput['delivery_fee'] - $orderInput;
            $orderInput['discount'] =  $discount;
        } else {
            $orderInput['paid_total'] = $orderInput['amount'] + $orderInput['sales_tax'] + $orderInput['delivery_fee'];
            $orderInput['total'] = $orderInput['amount'] + $orderInput['sales_tax'] + $orderInput['delivery_fee'];
        }
        $payment_gateway = 'stripe';
        $processProducts = $this->processProducts($data['products']);
     
        $products = $processProducts["products"];

        $orderInput["credit"]=$orderInput["mode"]=="NONE"? 0: $processProducts["credit"];

        return ['orderInput' => $orderInput, 'products' => $products, 'clickGamePlus' => ($user->subscription != null && $user->subscription->status) ? "SUBSCRIBER" : ($data["clickGamePlus"] ? "NEW" : "NONE")];
    }

    /**
     * @param $array
     * @return array|LengthAwarePaginator|Collection|mixed
     */
    public function createOrder($data)
    {
        try {
            $orderInput = $data['orderInput'];
            $products = $data['products'];

            $orderInput['mode_click_collect'] = $this->getClickCollect($products);
            if ($orderInput['mode_click_collect'] == "full") {
                $orderInput['shipping_class_id'] = null;
            }
            $order = $this->create($orderInput);
            $order->products()->attach($products);
            $this->createChildOrder($order, $data);
            //  $this->calculateShopIncome($order);
            //$order->children = $order->children;
            foreach ($order->children as $key => $c) {
                $this->processQuantity($c);
            }

            // event(new OrderCreated($order));
            try {

                Mail::to($order->customer->email)->send(new OrderValidated($order));
            } catch (\Exception $e) {
            }
            return $order;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    protected function calculateShopIncome($parent_order)
    {
        foreach ($parent_order->children as  $order) {
            $balance = Balance::where('shop_id', '=', $order->shop_id)->first();
            $adminCommissionRate = $balance->admin_commission_rate;
            $shop_earnings = ($order->total * (100 - $adminCommissionRate)) / 100;
            $balance->total_earnings = $balance->total_earnings + $shop_earnings;
            $balance->current_balance = $balance->current_balance + $shop_earnings;
            $balance->save();
        }
    }

    public function addShopIncome($order)
    {
        $balance = Balance::where('shop_id', '=', $order->shop_id)->first();
        $adminCommissionRate = $balance->admin_commission_rate;
        $shop_earnings = ($order->total * (100 - $adminCommissionRate)) / 100;
        $balance->total_earnings = $balance->total_earnings + $shop_earnings;
        $balance->current_balance = $balance->current_balance + $shop_earnings;
        $balance->save();
    }

    protected function processQuantity($children)
    {

        foreach ($children->products as $key => $product) {

            if ($product->pivot->variation_option_id) {
                $variation_option = VariationOption::query()->where('id', $product->pivot->variation_option_id)->first();
                $variation_option->quantity = $variation_option->quantity - $product->pivot->order_quantity;
                $variation_option->save();
            }
            $p = Product::query()->where('id', $product->pivot->product_id)->first();
            $p->quantity = $p->quantity - $product->pivot->order_quantity;
            $p->save();
        }
    }

    protected function processProducts($products)
    {
        $credit = 0;
        foreach ($products as $key => $product) {
            if (!isset($product['variation_option_id'])) {
                $product['variation_option_id'] = null;
                $products[$key] = $product;
            }
            if ($product["mode"] == "CGP") {
                $credit += $product["order_quantity"];
            }
        }
        return ["products" => $products, "credit" => $credit];
    }
    protected function getClickCollect($products)
    {
        $total = count($products);
        $totalClickCollect = 0;
        foreach ($products as $key => $product) {
            if ($product['click_collect']) {
                $totalClickCollect += 1;
            }
        }
        if ($totalClickCollect == $total) {
            return "full";
        } else if ($totalClickCollect > 0) {
            return "partial";
        } else {
            return "none";
        }
    }
    protected function calculateDiscount($orderInput)
    {
        try {
            if (!isset($orderInput['coupon_id'])) {
                return false;
            }
            $coupon = Coupon::findOrFail($orderInput['coupon_id']);
            if (!$coupon->is_valid) {
                return false;
            }
            switch ($coupon->type) {
                case 'percentage':
                    return ($orderInput['amount'] * $coupon->amount) / 100;
                case 'fixed':
                    return $coupon->amount;
                    break;
                case 'free_shipping':
                    return isset($orderInput['delivery_fee']) ? $orderInput['delivery_fee'] : false;
                    break;
            }
            return false;
        } catch (\Exception $exception) {
            return false;
        }
    }

    public function createChildOrder($order, $data)
    {
        $products = $data['products'];
        $id = $order->id;
        $productsByShop = [];

        foreach ($products as $key => $cartProduct) {
            $product = Product::findOrFail($cartProduct['product_id']);
            $productsByShop[$product->shop_id][] = $cartProduct;
        }


        foreach ($productsByShop as $shop_id => $cartProduct) {
            $amount = array_sum(array_column($cartProduct, 'subtotal'));
            $click_collect = $this->getClickCollect($cartProduct);
            $orderInput = [
                'ref' => $data['orderInput']['ref'] . "S" . $shop_id,
                'tracking_number' => NULL,
                'shop_id' => $shop_id,
                'status' => $data['orderInput']['status'],
                'customer_id' => $data['orderInput']['customer_id'],
                'shipping_address' => $data['orderInput']['shipping_address'],
                'customer_contact' => isset($data['orderInput']['customer_contact'])?$data['orderInput']['customer_contact']:null,
                'delivery_time' => $data['orderInput']['delivery_time'],
                'relay_point' => $data['orderInput']['relay_point'],
                'mode' => $data['orderInput']['mode'],
                'shipping_class_id' => $click_collect == "full" ? null : $data['orderInput']['shipping_class_id'],
                'mode_click_collect' => $click_collect,
                'delivery_fee' => 0,
                'sales_tax' => 0,
                'discount' => 0,
                'parent_id' => $id,
                'payment_info_id' => $order->payment_info_id,
                'amount' => $amount,
                'total' => $amount,
                'paid_total' => $amount,
            ];
            try {
                $shop = Shop::with('owner')->findorFail($shop_id);
                Mail::to($shop->owner->email)->send(new NewOrder());
            } catch (\Exception $e) {
            }

            $order = $this->create($orderInput);
            $order->products()->attach($cartProduct);
        }
    }
}
