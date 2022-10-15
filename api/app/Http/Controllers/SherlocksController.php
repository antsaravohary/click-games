<?php

namespace App\Http\Controllers;

use App\Models\PaymentCard;
use App\Models\PaymentInfo;
use App\Models\SherlockTransaction;
use App\Models\StripeSession;
use App\Models\StripeSubscription;
use App\Models\Transaction;
use App\Repositories\OrderRepository;
use App\Sherlock\SherlockResponse;
use App\Utility\Sherlocks;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Stripe\PaymentMethod;

class SherlocksController extends Controller
{
   //

   private $orderRepository;
   public function __construct(OrderRepository $orderRepository)
   {
      $this->orderRepository = $orderRepository;
   }

   public function sherlock(Request $request)
   {
      $user = $request->user();
      $sherlock = new Sherlocks();
      $session = StripeSession::find($request->MD);
      $t1 = SherlockTransaction::find($session->data["cardCheckEnrollment"]);
      $data = [
         "interfaceVersion" => "IR_WS_2.9",
         "messageVersion" => "0.1",
         "paResMessage" => $request->PaRes,
         "redirectionData" => $t1->response["redirectionData"],
         "transactionReference" => "TREFEXA2015",
      ];
      $t2 = $sherlock->cardValidateAuthenticationAndOrder($data, $t1->user_id, $t1->id);
      if ($t2->response["responseCode"] == "00" && $t2->response["acquirerResponseCode"] == "00" && $t2->response["holderAuthentStatus"] == "SUCCESS") {
         $data3 = [
            "cardExpiryDate" => $t1->data["cardExpiryDate"],
            "cardNumber" => $t1->data["cardNumber"],
            "interfaceVersion" => "WR_WS_2.3",
            "merchantWalletId" => $t1->user_id,
            "paymentMeanAlias" => "mycard_",
            "paymentMeanBrand" => $t2->response["paymentMeanBrand"]
         ];
         $payment_card = [
            "number" => $t1->data["cardNumber"],
            "expiry" => $t1->data["cardExpiryDate"],
            "cvc" => $t1->data["cardCSCValue"],
            "user_id" => $t1->user_id
         ];
         //$t3 = $sherlock->addCard($data3, $t1->user_id);

         /*   if ($t3->response["walletResponseCode"] == "00") {
            $payment_card["paymentMeanId"] = $t3->response["paymentMeanId"];
         }*/
         //$payment_card["data"] = $t3->response;
         $payment_card = PaymentCard::create($payment_card);
         $order = $this->valideOrder($session->id, $payment_card, $t2);

         return view("sherlock.redirect", ["url" => env("SHOP_URL") . "/orders\/" . $order->ref]);
      } else {
         $message = SherlockResponse::responseCode[$t2->response["responseCode"]];
         $code = $t2->response["responseCode"];
         if (isset($t2->response["acquirerResponseCode"]) && $t2->response["acquirerResponseCode"] != "00") {
            $message = SherlockResponse::acquirerResponseCode[$t2->response["acquirerResponseCode"]];
            $code = $t2->response["acquirerResponseCode"];
         }
         if ($t2->response["holderAuthentStatus"] != "SUCCESS") {
            $code = "3D SECURE ERROR";
            $message = "Authentification 3D secure n'est pas validée";
         }
         return view("sherlock.error_payment", ["code" => $code, "msg" => $message]);
         /*return [
            "status" => "failed",
            "code" => $t2->response["responseCode"],
            "msg" => SherlockResponse::responseCode[$t2->response["responseCode"]]
         ];*/
      }
   }
   public function test()
   {
      return "testing ....";
      $session = StripeSession::find(26);
      $t1 = SherlockTransaction::find(50);
      $t2 = SherlockTransaction::find(51);
    //  return $t1;
      if ($t2->response["responseCode"] == "00" && $t2->response["acquirerResponseCode"] == "00" && $t2->response["holderAuthentStatus"] == "SUCCESS") {
         $data3 = [
            "cardExpiryDate" => $t1->data["cardExpiryDate"],
            "cardNumber" => $t1->data["cardNumber"],
            "interfaceVersion" => "WR_WS_2.3",
            "merchantWalletId" => $t1->user_id,
            "paymentMeanAlias" => "mycard_",
            "paymentMeanBrand" => $t2->response["paymentMeanBrand"]
         ];
         $payment_card = [
            "number" => $t1->data["cardNumber"],
            "expiry" => $t1->data["cardExpiryDate"],
            "cvc" => $t1->data["cardCSCValue"],
            "user_id" => $t1->user_id
         ];
      
         //$t3 = $sherlock->addCard($data3, $t1->user_id);

         /*   if ($t3->response["walletResponseCode"] == "00") {
            $payment_card["paymentMeanId"] = $t3->response["paymentMeanId"];
         }*/
         //$payment_card["data"] = $t3->response;
         $payment_card = PaymentCard::create($payment_card);
        
         $order = $this->valideOrder($session->id, $payment_card, $t2);

         return view("sherlock.redirect", ["url" => env("SHOP_URL") . "/orders\/" . $order->ref]);
      } else {
         $message = SherlockResponse::responseCode[$t2->response["responseCode"]];
         $code = $t2->response["responseCode"];
         if (isset($t2->response["acquirerResponseCode"]) && $t2->response["acquirerResponseCode"] != "00") {
            $message = SherlockResponse::acquirerResponseCode[$t2->response["acquirerResponseCode"]];
            $code = $t2->response["acquirerResponseCode"];
         }
         if ($t2->response["holderAuthentStatus"] != "SUCCESS") {
            $code = "3D SECURE ERROR";
            $message = "Authentification 3D secure n'est pas validée";
         }
         return view("sherlock.error_payment", ["code" => $code, "msg" => $message]);
         /*return [
            "status" => "failed",
            "code" => $t2->response["responseCode"],
            "msg" => SherlockResponse::responseCode[$t2->response["responseCode"]]
         ];*/
      }

   }

   public function sherlock_transaction($id)
   {
      return SherlockTransaction::find($id);
   }

   public function formSecure($id)
   {
      $session = StripeSession::find($id);

      $t = SherlockTransaction::find($session->data["cardCheckEnrollment"]);
      return view('sherlock.form_secure', ["response" => $t->response,  "termUrl" => env("APP_URL") . "/sherlocks/return/" . $session->id, "MD" => $session->id]);
   }
   public function sherlockSubscriptionPay(Request $request, $id)
   {

      $sherlock = new Sherlocks();
      $now = Carbon::now();
      $subscription = StripeSubscription::find($id);

      $payment_card = PaymentCard::where('paymentMeanId',  $subscription->payment_method_id)->first();
      $data = [
         "amount" => "5999",
         "captureDay" => "0",
         "captureMode" => "AUTHOR_CAPTURE",
         "currencyCode" => "978",
         // "customerEmail"=>$subscription->user->email,
         // "customerIpAddress"=> "127.0.0.1",
         "interfaceVersion" => "CR_WS_2.3",
         "merchantTransactionDateTime" =>  Carbon::now()->toDateTimeLocalString(),
         "orderChannel" => "INTERNET",
         // "merchantWalletId" => $subscription->user->id,
         "fromTransactionReference" => $subscription->ref_transaction,
         //"paymentPattern" => "RECURRING_" . $subscription->time,
         "transactionOrigin" => "CLICK_INC",

      ];
      // return $data;
      $t = $sherlock->duplicate($data, $subscription->time, $subscription->user->id);

      //$t = SherlockTransaction::find(155);

      $object = "";
      if ($t->response['responseCode'] == "00") {
         if ($t->response['acquirerResponseCode'] != "00") {
            $t->status = "failed";
            return [
               "status" => "failed",
               "msg" => SherlockResponse::responseCode[$t->response['responseCode']]
            ];
         }

         if ($subscription->type == "CLICK_GAMES_PLUS_TRIAL") {
            $subscription->type = 'CLICK_GAMES_PLUS';
            $object = "Activation  abonnement ClickGames+ ";
            $data_transaction["click_games_plus"] = "NEW";
         } else {
            $object = "Reconduire  abonnement ClickGames+ " . Carbon::now()->format("MM");
            $subscription->credit = 2;
            $data_transaction["click_games_plus"] = "RENEW";
         }

         if (Carbon::createFromDate($subscription->current_period_end)->diffInDays($now) > 0) {
            $subscription->current_period_start = $subscription->current_period_end;
            $subscription->current_period_end = Carbon::createFromDate($subscription->current_period_end)->addMonth(1);
         } else {
            $subscription->current_period_start = $now;
            $subscription->current_period_end = $now->addMonth(1);
         }

         $subscription->status = true;
         $subscription->time = $subscription->time + 1;
         $subscription->save();
         $payment_info = PaymentInfo::create([
            "amount" => $t->data["amount"],
            "payment_method_details" => [],
            "status" => "paid",
         ]);
         $transaction = Transaction::create([
            "object" => $object,
            "type" => "CGP_PAID",
            "amount" => $data['amount'] / 100,
            "obs" => "",
            "data" => $data_transaction,
            "user_id" => $subscription->user->id,
            "subscription_id" => $subscription->id,
            "payment_info_id" => $payment_info->id
         ]);

         return [
            "status" => "success"
         ];
      } else {
         $t->status = "failed";
         $t->save();
         return [
            "status" => "failed",
            "msg" => SherlockResponse::responseCode[$t->response['responseCode']]
         ];
      }

      //  return $subscription;

   }

   /*   public function sherlockSubscriptionPay(Request $request, $id)
   {

      $sherlock = new Sherlocks();
      $now = Carbon::now();
      $subscription = StripeSubscription::find($id);

      $payment_card = PaymentCard::where('paymentMeanId',  $subscription->payment_method_id)->first();
      $data = [
         "amount" => "200",
         "captureDay" => "0",
         "captureMode" => "AUTHOR_CAPTURE",
         "currencyCode" => "978",
         // "customerIpAddress"=> "127.0.0.1",
         "interfaceVersion" => "IR_WS_2.3",
         "invoiceReference" => "FAC007NB",
         "merchantTransactionDateTime" =>  Carbon::now()->toDateTimeLocalString(),
         "orderChannel" => "INTERNET",
         "merchantWalletId" => $subscription->user->id,
         "paymentMeanId" => $subscription->payment_method_id,
         "paymentPattern" => "RECURRING_" . $subscription->time,
         "cardCSCValue" => $payment_card->cvc,
         "transactionOrigin" => "CLICK_INC",
         "transactionReference" => "TREFEXA201212",

      ];
       $t = $sherlock->walletOrder($data, $subscription->time, $subscription->user->id);
      //$t = SherlockTransaction::find(155);

      $object = "";
      if ($t->response['responseCode'] == "00") {
         if($t->response['acquirerResponseCode'] != "00" ){
            return [
               "status" => "failed",
               "msg" => SherlockResponse::responseCode[$t->response['responseCode']]
            ]; 
         }

         if ($subscription->type == "CLICK_GAMES_PLUS_TRIAL") {
            $subscription->type = 'CLICK_GAMES_PLUS';
            $object = "Activation  abonnement ClickGames+ ";
            $data_transaction["click_games_plus"] = "NEW";
         } else {
            $object = "Reconduire  abonnement ClickGames+ " . Carbon::now()->format("MM");
            $subscription->credit = 2;
            $data_transaction["click_games_plus"] = "RENEW";
         }

         if (Carbon::createFromDate($subscription->current_period_end)->diffInDays($now) > 0) {
            $subscription->current_period_start = $subscription->current_period_end;
            $subscription->current_period_end = Carbon::createFromDate($subscription->current_period_end)->addMonth(1);
         } else {
            $subscription->current_period_start = $now;
            $subscription->current_period_end = $now->addMonth(1);
         }

         $subscription->status = true;
         $subscription->time = $subscription->time + 1;
         $subscription->save();
         $payment_info = PaymentInfo::create([
            "amount" => $t->data["amount"],
            "payment_method_details" => [],
            "status" => "paid",
         ]);
         $transaction = Transaction::create([
            "object" => $object,
            "type" => "CGP_PAID",
            "amount" => $data['amount'] / 100,
            "obs" => "",
            "data" => $data_transaction,
            "user_id" => $subscription->user->id,
            "subscription_id" => $subscription->id,
            "payment_info_id" => $payment_info->id
         ]);

         return [
            "status" => "success"
         ];
      } else {
         return [
            "status" => "failed",
            "msg" => SherlockResponse::responseCode[$t->response['responseCode']]
         ];
      }

      //  return $subscription;

   }*/
   public function paymentProduct(Request $request)
   {
      $user = $request->user();
      $data = [];
      $data = $this->orderRepository->prepareOrder($request['data']['data'], $user);
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
      $amount = strval(round($data['orderInput']['paid_total'], 2) * 100);
      $type = "payement_order";
      $sherlock = new Sherlocks();
      $dataSherlock = [
         "amount" => $amount,
         "captureDay" => "0",
         "captureMode" => "AUTHOR_CAPTURE",
         "cardCSCValue" => $request->cardCvc,
         "cardExpiryDate" => $request->cardExpiry,
         "cardNumber" =>  $request->cardNumber,
         "customerIpAddress" => $this->getIPAddress(),
         "currencyCode" => "978",
         "interfaceVersion" => "IR_WS_2.9",
         "merchantTransactionDateTime" => Carbon::now()->toDateTimeLocalString(),
         "fraudData" => ["challengeMode3DS" => "CHALLENGE_MANDATE"],
         "orderChannel" => "INTERNET",
         "orderId" =>    $data['orderInput']['ref'],
      ];

      $res = $sherlock->cardCheckEnrollment($dataSherlock, $user);
      $d=$res->data;
      $d["name"]=$request->name;
      $res->data=$d;
      $res->save();
      $data["cardCheckEnrollment"] = $res->id;
      
      $stripeSession->data = $data;
      $stripeSession->save();
      if ($res->response["redirectionStatusCode"] != "00") {
         return [
            "status" => "failed",
            "msg" => SherlockResponse::responseCode[$res->response["redirectionStatusCode"]]
         ];
      }
      if (isset($res->response['redirectionUrl'])) {
         $res = $res->response;
         if ($res["redirectionStatusCode"] == "00") {
            return [
               "status" => "redirect_3dsecure",
               "url" => env("APP_URL") . "/sherlocks/secure/" . $stripeSession->id
            ];
         }
      } else {
         $dataC = [
            "interfaceVersion" => "IR_WS_2.9",
            "messageVersion" => "0.1",
            "redirectionData" => $res->response["redirectionData"],
            "transactionReference" => "TREFEXA2015",
         ];
         //valid card authentification and order sans 3d secure
         $t2 = $sherlock->cardValidateAuthenticationAndOrder($dataC, $res->user_id, $res->id);

         if ($t2->response["responseCode"] == "00") {
            $data3 = [
               "cardExpiryDate" => $res->data["cardExpiryDate"],
               "cardNumber" => $res->data["cardNumber"],
               "name" => $res->data["name"],
               "interfaceVersion" => "WR_WS_2.3",
               "merchantWalletId" => $res->user_id,
               "paymentMeanAlias" => "mycard"
            ];
            $payment_card = [
               "number" => $res->data["cardNumber"],
               "expiry" => $res->data["cardExpiryDate"],
               "cvc" => $res->data["cardCSCValue"],
               "user_id" => $res->user_id
            ];
            $t3 = $sherlock->addCard($data3, $res->user_id);

            if ($t3->response["walletResponseCode"] == "00") {
               $payment_card["paymentMeanId"] = $t3->response["paymentMeanId"];
               $payment_card["data"] = $t3->response;

               $payment_card = PaymentCard::create($payment_card);
            }
            $this->valideOrder($stripeSession->id, $payment_card);
            return 200;
         } else {
            return [
               "status" => "failed",
               "msg" => SherlockResponse::responseCode[$t2->response["responseCode"]]
            ];
         }
      }

      return $res;
   }

   public function valideOrder($session_id, $payment_card, $t)
   {
      $now = Carbon::now();
      $session = StripeSession::find($session_id);
      $data = $session['data'];
      //$data['orderInput']['customer_contact'] = 0;
      $order = $this->orderRepository->createOrder($data);
      $payment_info = PaymentInfo::find($data['payment_info_id']);
      $payment_info->payment_intent_id = $payment_card->id;
      $payment_info->status = "paid";
      $payment_info->save();
      $order->payment_info_id = $payment_info->id;
      $order->save();
      $data_transaction = [
         "order_ref" => $order->ref,
         "order_id" => $order->id
      ];
      //on doit faire if  $order->credit, mais la on force l'utilisateur de s'abonnée toujours
      if (true) {
         $user = $order->customer;
         if ($user->stripe_subscription_id == null) {
            $subscription = StripeSubscription::create([
               'type' => 'CLICK_GAMES_PLUS_TRIAL',
               'current_period_start' => $now,
               'current_period_end' => Carbon::createFromDate($now)->addDay(3),
               'ref_transaction' => $t->response['transactionReference'],
               'time' => 1,
               "status" => 1,
               "credit" => 2
            ]);
            $user->stripe_subscription_id = $subscription->id;
            $data_transaction["click_game_plus"] = "NEW";
            $user->save();
         }

         $subscription = $user->subscription;
         // $subscription->payment_method_id = $payment_card->paymentMeanId;
         // return ["subscription"=>$subscription,"order"=>$order];
         $subscription->credit = $subscription->credit - $order->credit;
         // si donc le credit est negatif, on doit majoré l'abonnement pour la prochaiemen paiement avec le nombre negatif comme quantité
         /*if ($subscription->credit < 0) {
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
         "amount" => $t->response['amount'] / 100,
         "obs" => "",
         "data" => $data_transaction,
         "user_id" => $order->customer_id
      ]);
      return $order;
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
