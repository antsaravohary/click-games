<?php

namespace App\Http\Controllers;

use App\Models\PaymentInfo;
use App\Models\StripeSession;
use App\Models\StripeSubscription;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\OrderRepository;
use App\Repositories\PromotionRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class ControllerMoneyTigo extends Controller
{
  private $userRepository;
  private $orderRepository;
  private $promotionRepository;
  public function __construct(UserRepository $userRepository, OrderRepository $orderRepository, PromotionRepository $promotionRepository)
  {

    $this->userRepository = $userRepository;
    $this->orderRepository = $orderRepository;
    $this->promotionRepository = $promotionRepository;
  }
  public function test(Request $request)
  {
    $user = $request->user();
    $subscription = $user->subscription;
    if ($request['action'] == "create_order_payment") {
      $data = $this->orderRepository->prepareOrder($request['data'], $user);
    }
    $payment_info = PaymentInfo::create([
      "ip_client" => $this->getIPAddress(),
      "amount" => round($data['orderInput']['total'], 2),
    ]);
    $stripeSession = StripeSession::where('status', 0)->where('user_id', $user->id)->orderByDesc('id')->first();
    if ($stripeSession) {
      $stripeSession->user_id = $user->id;
      $stripeSession->data = $data;
    } else {
      $stripeSession = StripeSession::create([
        'user_id' => $user->id,
        'data' => $data
      ]);;
    }

    $stripeSession->save();
    $data['orderInput']['ref'] = 'CU' .  $stripeSession->created_at->format('dm') .  $stripeSession->created_at->format("Y") . $stripeSession->id;
    $stripeSession->data = $data;
    $stripeSession->save();
    $amount = round($data['orderInput']['paid_total'], 2);
    $type = "payement_order";
    $meta['meta'] = $stripeSession->id;
    $MyVars = array(
      'MerchantKey' => env("MONEY_TIGO_KEY_API"),
      'amount' => $data["clickGamePlus"] != "NONE" ? 69.99 : $amount,
      'RefOrder' => $stripeSession->id,
      'Customer_Email' => "testbbox123@gmail.com",
      'Customer_Phone' => "",
      'Customer_Name' => $user->last_name,
      'Customer_FirstName' => $user->first_name,
      'lang' => 'fr',
      'urlIPN' => env("APP_URL") . '/tigo/webhook',
      'urlOK' => env("SHOP_URL") . '/orders' . '/' . $data['orderInput']["ref"],
      'urlKO' => 'https://site.com/failed'
    );
    if ($data["clickGamePlus"] == "NEW") {
      $MyVars["Subscribe"] = "Yes";
      $MyVars["Subscribe_Period"] = "week";
      $MyVars["Subscribe_Trial"] = "Yes";
      $MyVars["Subscribe_Trial_Days"] = 1;
      $MyVars["Subscribe_Trial_Amount"] = $amount;
    }
    $MySignedRequest = $this->mtg_Sign($MyVars, env("MONEY_TIGO_SECRET"));
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://payment.moneytigo.com/init_transactions/');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($MySignedRequest)); //use http_build_query for post readable vars by IPS
    $headers = array();
    $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $result = curl_exec($ch);
    if (curl_errno($ch)) {
      echo 'Error:' . curl_error($ch);
    }
    curl_close($ch); //Close connection
    return $result;
  }


  public function webhook(Request $request)
  {

    $event = $request->toArray();
    if ($request["Status"] != 2) {
      return 200;
    }
    $stripeSession = StripeSession::find($request->toArray()["MerchantRef"]);
    $data = $stripeSession['data'];
    $order = $this->orderRepository->createOrder($data);
    $payment_info = PaymentInfo::create([
      "ip_client" => $event["CustomerIP"],
      "amount" => $event["Amount"],
      "status" => "paid",
      "payment_method_details" => $request->only(["CardType", "CardNumber", "CardExpire", "CardToken", "BankTrxID"])
    ]);
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
          "status" => 1,
          "credit" => 2
        ]);
        $user->stripe_subscription_id = $subscription->id;
        $user->save();
      }
      $subscription = $user->subscription;
      // return ["subscription"=>$subscription,"order"=>$order];
      $subscription->credit = $subscription->credit - $order->credit;
      // si donc le credit est negatif, on doit majoré l'abonnement pour la prochaiemen paiement avec le nombre negatif comme quantité
      /* if ($subscription->credit < 0) {
          $stripe_subscription = \Stripe\Subscription::retrieve($subscription->subscription_id);
          \Stripe\subscription::update($subscription->subscription_id, [
            'items' => [
              ['id' =>  $stripe_subscription->items->data[1]->id, 'quantity' => abs($subscription->credit)]
            ]
          ]);
        }*/
      $subscription->save();
    }
    $transaction = Transaction::create([
      "object" => "Paiement commande  ref N°" . $order->ref,
      "type" => "ORDER_PAID",
      "amount" => $event["Amount"],
      "obs" => "",
      "data" => $data_transaction,
      "user_id" => $order->customer_id
    ]);
    $stripeSession->status = true;
    $stripeSession->save();
    return 200;
  }

  function mtg_Sign($params, $MySecretKey, $beforesign = NULL)
  {
    foreach ($params as $key => $value) {
      $beforesign .= $value . "!";
    }
    $beforesign .= $MySecretKey;
    $sign = hash("sha512", base64_encode($beforesign . "|" . $MySecretKey));
    $params['SHA'] = $sign;
    return $params;
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
