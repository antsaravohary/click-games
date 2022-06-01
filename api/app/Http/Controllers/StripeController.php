<?php

namespace App\Http\Controllers;

use App\Exceptions\PickbazarException;
use App\Http\Requests\OrderCreateRequest;
use App\Mail\NewOrder;
use App\Models\Balance;
use App\Models\Exchange;
use App\Models\Order;
use App\Models\PaymentInfo;
use App\Models\Repair;
use App\Models\Shop;
use App\Models\StripeSession;
use App\Models\StripeSubscription;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\OrderRepository;
use App\Repositories\PromotionRepository;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Mail;

class StripeController extends Controller
{

  private $userRepository;
  private $orderRepository;
  private $promotionRepository;
  private $stripe;
  public function __construct(UserRepository $userRepository, OrderRepository $orderRepository, PromotionRepository $promotionRepository)
  {
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    \Stripe\Stripe::setVerifySslCerts(false);
    $this->stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
    $this->userRepository = $userRepository;
    $this->orderRepository = $orderRepository;
    $this->promotionRepository = $promotionRepository;
  }


  public function removeCard(Request $request, $id)
  {
    try {
      $this->stripe->paymentMethods->detach($id);
    } catch (\Throwable $th) {
      //throw $th;
    }
    return 200;
  }

  /**
   *  @return JsonResponse
   */

  public function createPayment(Request $request)
  {
    $paymentIntent = [];
    $paymentIntentData = [];
    $amount = 0;
    $user = $request->user();
    $stripeSession = null;
    $data = [];
    $meta = [];
    $type = "";
    $customer = $this->getCustomer($user);
    if ($request['action'] == 'promotion_pay') {
      $data = $this->promotionRepository->preparePromotion($request);
      $amount = $data['promotionInput']['total_amount'];
      $stripeSession = StripeSession::create([
        'user_id' => $user->id,
        'data' => $data
      ]);
      $stripeSession->save();
      $type = "payment_promotion";
    } else if ($request['action'] == "create_order_payment") {
      $data = $this->orderRepository->prepareOrder($request['data'], $user);
      $payment_info = PaymentInfo::create([
        "ip_client" => $this->getIPAddress(),
        "amount" => round($data['orderInput']['total'], 2),
      ]);
      $data['payment_info_id'] = $payment_info->id;
      $stripeSession = StripeSession::create([
        'user_id' => $user->id,
        'data' => $data
      ]);
      $stripeSession->save();
      $data['orderInput']['ref'] = 'CU' .  $stripeSession->created_at->format('dm') .  $stripeSession->created_at->format("Y") . $stripeSession->id;
      $stripeSession->data = $data;
      $stripeSession->save();
      $amount = round($data['orderInput']['paid_total'], 2);
      $type = "payement_order";
      $meta['meta'] = $data['orderInput']['ref'];
    } else if ($request['action'] == "create_repair_payment") {
      $data = [];
      $data["repair_id"] = $request["data"]["repair_id"];
      $repair = Repair::findOrFail($data["repair_id"]);
      $payment_info = $repair->payment_info;
      if ($payment_info == null) {
        $payment_info = PaymentInfo::create([
          "ip_client" => $this->getIPAddress(),
          "amount" => round($repair->total_amount, 2),
        ]);
      } else {
        $payment_info->update([
          "ip_client" => $this->getIPAddress(),
          "amount" => round($repair->total_amount, 2),
        ]);
      }
      $data['payment_info_id'] = $payment_info->id;

      $repair->payment_info_id = $payment_info->id;
      $repair->save();
      $stripeSession = StripeSession::create([
        'user_id' => $user->id,
        'data' => $data
      ]);
      $stripeSession->save();
      $amount = round($repair->total_amount, 2);
      $type = "payement_repair";
      $meta['repair_id'] = $repair->id;
    } else if ($request['action'] == "create_exchange_payment") {
      $data = [];
      $data["exchange_id"] = $request["data"]["exchange_id"];
      $exchange = Exchange::findOrFail($data["exchange_id"]);
      $payment_info = $exchange->payment_info;
      if ($payment_info == null) {
        $payment_info = PaymentInfo::create([
          "ip_client" => $this->getIPAddress(),
          "amount" => round($exchange->amount, 2),
        ]);
      } else {
        $payment_info->update([
          "ip_client" => $this->getIPAddress(),
          "amount" => round($exchange->amount, 2),
        ]);
      }
      $data['payment_info_id'] = $payment_info->id;

      $exchange->payment_info_id = $payment_info->id;
      $exchange->save();
      $stripeSession = StripeSession::firstOrCreate([
        'user_id' => $user->id,
        'status' => 0,
        'type' => "exchange"

      ]);
      $stripeSession->data = $data;

      $stripeSession->save();
      $amount = round($exchange->amount, 2);
      $type = "payement_exchange";
      $meta['exchange_id'] = $exchange->id;
    }
    $meta['user_id'] = $user->id;
    $meta['type'] = $type;
    $meta['stripe_session_id'] = $stripeSession->id;
    $paymentIntentData = [
      'amount' => $amount * 100,
      'currency' => 'EUR',
      'customer' => $user->stripe_id,
      'metadata' => $meta
    ];
    if ($request['new_card'] == false && isset($request['payment_id']) && $request['payment_id'] != "") {
      $paymentIntentData['off_session'] = true;
      $paymentIntentData['confirm'] = true;
      $paymentIntentData['payment_method'] = $request['payment_id'];
    }
    try {
      $paymentIntent = \Stripe\PaymentIntent::create($paymentIntentData);
    } catch (\Stripe\Exception\CardException $e) {
      // Error code will be authentication_required if authentication is needed
      //  echo 'Error code is:' . $e->getError()->code;
      $payment_intent_id = $e->getError()->payment_intent->id;
      $paymentIntent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
    }

    return ["paymentIntent" => $paymentIntent, "stripe_session" => $stripeSession];
  }
  /*
  public function create(OrderCreateRequest $request)
  {
    $data = $this->orderRepository->prepareOrder($request);
    $user = $request->user();

    $customer = $this->getCustomer($user);
    $amount = round($request['paid_total'], 2);

    $stripeSession = StripeSession::create([
      'user_id' => $user->id,
      'data' => $data
    ]);
    $data['orderInput']['ref'] = 'CU' .  $stripeSession->created_at->format('dm') .  $stripeSession->created_at->format("Y") . $stripeSession->id;
    $stripeSession->data = $data;
    $stripeSession->save();
    $paymentIntent = \Stripe\PaymentIntent::create([
      'amount' => $amount * 100,
      'currency' => 'EUR',
      'payment_method_types' => ['card'],
      'customer' => $user->stripe_id,
      'metadata' => ['type' => 'payement_order', 'stripe_session_id' => $stripeSession->id]
    ]);


    $output = [

      'clientSecret' => $paymentIntent->client_secret,
      'stripeSession' => $stripeSession
    ];
    return $output;
  }*/
  public function subscriptionPortal(Request $request)
  {
    $user = $request->user();

    try {
      $subscription = Shop::findOrFail($request['shopId'])->subscription;
      $stripe_subscription = \Stripe\Subscription::retrieve($subscription->subscription_id);
      return [
        'subscription' => $subscription,
        'stripe_subscription' => $stripe_subscription
      ];
    } catch (\Throwable $th) {
      throw $th;
    }


    return $subscription;

    /*$session = \Stripe\BillingPortal\Session::create([
      'customer' => $customer['id'],
      'return_url' =>  $cancel_url,
    ]);


    return ['url' => $session->url];*/
  }
  public function subscription(Request $request, $priceId)
  {
    $user = $request->user();
    $shopId = $request['shopId'];
    $success_url = $request['success_url'];
    $cancel_url = $request['cancel_url'];
    $customer = $this->getCustomer($user);
    $subscription = \Stripe\Subscription::create([
      'customer' => $customer['id'],
      'default_payment_method' => $request['payment_id'],
      'items' => [
        ['price' =>  $priceId,]
      ],
      'metadata' => [
        'shopId' => $request['shopId'],
      ],
      'payment_behavior' => 'allow_incomplete',
      //'billing_cycle_anchor' => 1611008505,
      'expand' => ['latest_invoice.payment_intent'],
    ]);
    return $subscription;
    try {
      $checkout_session = \Stripe\Checkout\Session::create([
        'success_url' =>   $success_url,
        'cancel_url' =>  $cancel_url,
        'payment_method_types' => ['card'],
        'mode' =>  "subscription",
        'client_reference_id' => 'subscription',
        'metadata' => ['shop_id' => $shopId],
        'customer' => $customer['id'],
        'line_items' => [[
          'price' => $priceId,
          'quantity' => 1,
        ]],

      ]);
      return ["checkout" => $checkout_session];
    } catch (Exception $e) {


      throw $e;
    }
  }

  public function subscriptionActive($user_id)
  {
    $user = User::findOrFail($user_id);

    $paymentMethods = \Stripe\PaymentMethod::all([
      'customer' => $user->stripe_id,
      'type' => 'card'
    ]);
    $order = Order::where('customer_id', $user->id)->where('mode', 'CGP_NEW')->first();
    $paymentMehod = $paymentMethods["data"][0];
    $credit = 2 - $order->credit;
    try {
      $subscription = \Stripe\Subscription::create([
        'customer' => $user->stripe_id,
        'default_payment_method' =>  $paymentMehod["id"],
        'items' => [
          ['price' => env("PRODUCT_STRIPE_CGP"),],
          ['price' => env("PRODUCT_STRIPE_CGPS"), 'quantity' => $credit > 0 ? 0 : abs($credit)]

        ],
        'metadata' => [
          'user_id' => $user->id,
          'type' => "CLICK_GAME_PLUS",
          'order_ref' => $order->ref,
          "order_id" => $order->id,
        ],
        'payment_behavior' => 'allow_incomplete',
        'off_session' => true,
        //'billing_cycle_anchor' => 1611008505,
        'expand' => ['latest_invoice.payment_intent'],
      ]);
      return 200;
    } catch (\Throwable $th) {
      throw new PickbazarException('ERROR');
    }
  }

  public function subscribeUser(Request $request)
  {
    $user = $request->user();
    $success_url = $request['success_url'];
    $cancel_url = $request['cancel_url'];
  }
  public function saveCard(Request $request, $token)
  {
    $user = $request->user();
    $customer = $this->getCustomer($user);
    try {
      $response = \Stripe\Customer::update($customer['id'], [
        'source' => $token
      ]);
      return $this->$response;
    } catch (\Throwable $th) {
    }
  }

  public function cardPayementList(Request $request)
  {
    $user = $request->user();
    $customer = $this->getCustomer($user);
    $paymentMethode = \Stripe\PaymentMethod::all([
      'customer' => $customer['id'],
      'type' => 'card'
    ]);
    return $paymentMethode;
  }
  public function cardPayement(Request $request, $id)
  {
    //  $user = $request->user();
    //$customer = $this->getCustomer($user);
    $paymentMethode = \Stripe\PaymentMethod::retrieve($id);
    return $paymentMethode;
  }

  /**
   * @return JsonResponse
   */
  public function webhook()
  {
    $payload = @file_get_contents('php://input');
    $event = null;

    try {

      $event = \Stripe\Event::constructFrom(
        json_decode($payload, true)
      );
    } catch (\UnexpectedValueException $e) {

      // Invalid payload

      echo '⚠️  Webhook error while parsing basic request.';

      http_response_code(200);

      exit();
    }
    switch ($event->type) {

      case 'payment_intent.succeeded':

        $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
        // if($paymentIntent->metadata->type=="payement_order"){
        $stripeSession = StripeSession::find($paymentIntent->metadata->stripe_session_id);
        $type = $paymentIntent->metadata->type;
        if ($stripeSession) {
          switch ($type) {
            case 'payment_promotion':

              return $this->promotionRepository->store($stripeSession['data']);
              break;
            case 'payement_order':
              $data = $stripeSession['data'];
              $data['orderInput']['customer_contact'] = $paymentIntent->charges->data[0]->billing_details->phone;
              $order = $this->orderRepository->createOrder($data);
              //$order=Order::find(4);
              $payment_info = PaymentInfo::find($data['payment_info_id']);
              $payment_info->payment_intent_id = $paymentIntent['id'];
              $payment_info->payment_method_details = $paymentIntent['charges']['data'][0]['payment_method_details'];
              $payment_info->status = "paid";
              $payment_info->save();
              $order->payment_info_id = $payment_info->id;
              $order->save();
              $data_transaction = [
                "order_ref" => $order->ref,
                "order_id" => $order->id
              ];
              if ($order->credit) {
                $user = $order->customer;
                if ($user->stripe_subscription_id == null) {
                  $subscription = StripeSubscription::create([
                    'type' => 'CLICK_GAMES_PLUS_TRIAL',
                    "status" => 0,
                    "credit" => 2
                  ]);
                  $user->stripe_subscription_id = $subscription->id;
                  $user->save();
                }
                $subscription = $user->subscription;
                // return ["subscription"=>$subscription,"order"=>$order];
                $subscription->credit = $subscription->credit - $order->credit;
                // si donc le credit est negatif, on doit majoré l'abonnement pour la prochaiemen paiement avec le nombre negatif comme quantité
                if ($subscription->credit < 0) {
                  $stripe_subscription = \Stripe\Subscription::retrieve($subscription->subscription_id);
                  \Stripe\subscription::update($subscription->subscription_id, [
                    'items' => [
                      ['id' =>  $stripe_subscription->items->data[1]->id, 'quantity' => abs($subscription->credit)]
                    ]
                  ]);
                }
                $subscription->save();
              }


              if ($data['clickGamePlus'] == "NEW") {

                //on crée un nouveau membre de click game plus
                /* $credit = 2 - $order->credit;
                $subscription = \Stripe\Subscription::create([
                  'customer' => $paymentIntent->charges->data[0]["customer"],
                  'default_payment_method' =>  $paymentIntent->charges->data[0]["payment_method"],
                  'items' => [
                    ['price' => env("PRODUCT_STRIPE_CGP"),],
                    ['price' => env("PRODUCT_STRIPE_CGPS"), 'quantity' => $credit > 0 ? 0 : abs($credit)]

                  ],
                  'metadata' => [
                    'user_id' => $order->customer_id,
                    'type' => "CLICK_GAME_PLUS",
                    'order_ref' => $order->ref,
                    "order_id" => $order->id,
                  ],
                  'payment_behavior' => 'allow_incomplete',
                  'off_session' => true,
                  //'billing_cycle_anchor' => 1611008505,
                  'expand' => ['latest_invoice.payment_intent'],
                ]);*/

                $subscription = $user->subscription;
                $subscription->current_period_start = Carbon::now()->toDateTimeString();
                $subscription->current_period_end = Carbon::now()->addDay(1)->toDateTimeString();
                $subscription->status = 1;
                $subscription->save();
                $data_transaction["click_game_plus"] = "NEW";
              }
              $transaction = Transaction::create([
                "object" => "Paiement commande  ref N°" . $order->ref,
                "type" => "ORDER_PAID",
                "amount" => $paymentIntent['amount_received'] / 100,
                "obs" => "",
                "data" => $data_transaction,
                "user_id" => $order->customer_id
              ]);
              $stripeSession->status = true;
              $stripeSession->save();
              return 200;
              break;
            case 'payement_repair':
              $repair = Repair::findorFail($stripeSession['data']['repair_id']);
              $repair->total_paid = $paymentIntent['amount_received'] / 100;
              $repair->paid_at = Carbon::now()->toDateTimeString();
              $repair->status = "paid";
              $payment_info = $repair->payment_info;
              $payment_info->payment_intent_id = $paymentIntent['id'];
              $payment_info->payment_method_details = $paymentIntent['charges']['data'][0]['payment_method_details'];
              $payment_info->status = "paid";
              $transaction = Transaction::create([
                "object" => "Paiement reparation console ref " . $repair->ref,
                "type" => "REPAIR_PAID",
                "amount" => $repair->total_paid,
                "obs" => "",
                "data" => [
                  "repair_id" => $repair->id,
                  "repair_ref" => $repair->ref
                ],
                "user_id" => $repair->user_id,
              ]);
              // $repair->payment_info_id = $payment_info;
              $payment_info->save();
              $repair->save();
              // return $repair;
              return ["payment_info" => $payment_info];
              break;
            case 'payement_exchange':
              $exchange = Exchange::findorFail($stripeSession['data']['exchange_id']);
              $exchange->total_paid = $paymentIntent['amount_received'] / 100;
              $exchange->paid_at = Carbon::now()->toDateTimeString();
              $exchange->status = "paid";
              $payment_info = $exchange->payment_info;
              $payment_info->payment_intent_id = $paymentIntent['id'];
              $payment_info->payment_method_details = $paymentIntent['charges']['data'][0]['payment_method_details'];
              $payment_info->status = "paid";
              $transaction = Transaction::create([
                "object" => "Paiement reparation console ref " . $exchange->ref,
                "type" => "REPAIR_PAID",
                "amount" => $exchange->total_paid,
                "obs" => "",
                "data" => [
                  "exchange_id" => $exchange->id,
                  "exchange_ref" => $exchange->ref
                ],
                "user_id" => $exchange->user_id,
              ]);
              // $repair->payment_info_id = $payment_info;
              $payment_info->save();
              $exchange->save();
              return 200;
              // return $repair;
              //return ["payment_info" => $payment_info];
              break;

            default:
              break;
          }
        }

        //}

        break;

      case 'payment_method.attached':

        break;
      case 'checkout.session.completed':
        $first = false;
        $shop = Shop::find($event->data->object->metadata->shop_id);

        $subscription = StripeSubscription::find($shop->stripe_subscription_id);

        $user = User::where('customer_id', $event->data->object->customer);

        if ($subscription == null) {
          $first = true;
          $subscription = StripeSubscription::create([
            'type' => 'free',
            'current_period_start' => Carbon::now()->toDateTimeString(),
            'current_period_end' => Carbon::now()->toDateTimeString(),
          ]);
          $shop->stripe_subscription_id = $subscription->id;
        }
        $dt_start = Carbon::now();
        $dt_end = Carbon::now();
        if ($subscription->current_period_end > $dt_end->getTimestamp()) {
          $dt_end->setTimestamp($subscription->current_period_end);
        }
        if ($event->data->object->subscription) {
          $subscriptionData = \Stripe\Subscription::retrieve($event->data->object->subscription);
          $subscription->subscription_id = $event->data->object->subscription;
          $dt_start->setTimestamp($subscriptionData['current_period_start']);
          $dt_end->setTimestamp($subscriptionData['current_period_end']);
        } else {
          $subscription->setSubscriptionId(null);
          $dt_end->addMonth();
        }

        $subscription->type = "STANDARD";
        $subscription->current_period_end = $dt_end->toDateTimeString();
        $shop->is_expired = false;
        $subscription->save();
        if ($first) {
          $shop->is_active = true;
        }

        $shop->save();




        break;
      case 'invoice.paid':
        $data = $event->data->object->lines->data[0];
        switch ($data->metadata->type) {
          case 'CLICK_GAME_PLUS':

            return  $this->subscription_user($data);

            break;

          default:
            # code...
            break;
            echo "invoice paid ok";
        }


        break;
      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.

      default:

        // Unexpected event type

        echo 'Received unknown event type';
    }
    return 200;
  }
  public function getCustomer(User $user)
  {
    $customer = null;
    if ($user->stripe_id != null) {
      try {
        $customer = \Stripe\Customer::retrieve($user->stripe_id);
      } catch (\Throwable $th) {
      }
    }
    if ($customer == null) {
      $customer = \Stripe\Customer::create(['description' => "create client", "email" => $user->email, 'name' => $user->name]);
      $user->stripe_id = $customer['id'];
      $user->save();
    }
    return $customer;
  }

  public function subscription_vendor($data)
  {
    $shop = Shop::find($data->metadata->shopId);
    $subscription = StripeSubscription::find($shop->stripe_subscription_id);

    if ($subscription == null) {
      $first = true;
      $subscription = StripeSubscription::create([
        'type' => 'free',
        'current_period_start' => Carbon::now()->toDateTimeString(),
        'current_period_end' => Carbon::now()->toDateTimeString(),


      ]);
      $shop->stripe_subscription_id = $subscription->id;
      $subscription->subscription_id = $data->subscription;
    }
    $dt_start = Carbon::now();
    $dt_end = Carbon::now();
    if ($subscription->current_period_end > $dt_end->getTimestamp()) {
      $dt_end->setTimestamp($subscription->current_period_end);
    } else {
      $dt_end->addMonth();
    }

    $subscription->type = "STANDARD";
    $subscription->current_period_end = $dt_end->toDateTimeString();
    $shop->is_expired = false;
    $subscription->save();
    if ($first) {
      $shop->is_active = true;
      $balance = Balance::firstOrNew(['shop_id' => $shop->id]);
      $balance->admin_commission_rate = 3;
      $balance->save();
    }
    $shop->save();
  }

  public function subscription_user($data)
  {


    $object = "";
    $data_transaction = [];
    $user = User::findOrFail($data->metadata->user_id);
    $subscription = $user->subscription;

    if ($subscription == null || $subscription->subscription_id == null) {
      if ($subscription == null) {
        $subscription = StripeSubscription::create([
          'type' => 'CLICK_GAMES_PLUS',
          'subscription_id' => $data->subscription,
          'status' => false,
          'current_period_start' => Carbon::now()->toDateTimeString(),
          'current_period_end' => Carbon::now()->toDateTimeString(),
          'credit' => 2,
        ]);

        $user->stripe_subscription_id = $subscription->id;
      }
      $subscription->type = 'CLICK_GAMES_PLUS';
      $subscription->subscription_id = $data->subscription;

      $object = "Activation  abonnement ClickGames+ ";
      $data_transaction["click_games_plus"] = "NEW";
      $data_transaction["order_ref"] = $data->metadata->order_ref;
      $data_transaction["order_id"] = $data->metadata->order_ref;
      $user->save();
    } else {
      $object = "Reconduire  abonnement ClickGames+ " . Carbon::now()->format("MM");
      $subscription->credit(2);
      $data_transaction["click_games_plus"] = "RENEW";
    }
    $stripe_subscription = \Stripe\Subscription::retrieve($subscription->subscription_id);
    $subscription->current_period_end = Carbon::createFromTimestamp($stripe_subscription->current_period_end);
    $subscription->current_period_start = Carbon::createFromTimestamp($stripe_subscription->current_period_start);
    if ($stripe_subscription->status) {
      $subscription->status = true;
    }
    $subscription->payment_method_id = $stripe_subscription["default_payment_method"];
    $subscription->save();
    $data_transaction["click_games_plus"] = "RENEW";
    $payment_methode = \Stripe\PaymentMethod::retrieve($stripe_subscription['default_payment_method']);
    $payment_info = PaymentInfo::create([
      "amount" => $data['amount'] / 100,
      "payment_method_details" => $payment_methode,
      "status" => "paid",
    ]);
    $transaction = Transaction::create([
      "object" => $object,
      "type" => "CGP_PAID",
      "amount" => $data['amount'] / 100,
      "obs" => "",
      "data" => $data_transaction,
      "user_id" => $user->id,
      "payment_info_id" => $payment_info->id
    ]);
    if ($data_transaction["click_games_plus"] == "RENEW") {
      $stripe_subscription = \Stripe\Subscription::retrieve($subscription->subscription_id);
      \Stripe\subscription::update($subscription->subscription_id, [
        'items' => [
          ['id' =>  $stripe_subscription->items->data[1]->id, 'quantity' => 0]
        ]
      ]);
    }
  }
  function getIPAddress()
  {
    //whether ip is from the share internet  
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
      $ip = $_SERVER['HTTP_CLIENT_IP'];
    }
    //whether ip is from the proxy  
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    //whether ip is from the remote address  
    else {
      $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
  }
}
