<?php

namespace App\Http\Controllers;

use App\Models\PaymentCard;
use App\Models\PaymentInfo;
use App\Models\SherlockTransaction;
use App\Models\StripeSession;
use App\Models\StripeSubscription;
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
         $t3 = $sherlock->addCard($data3, $t1->user_id);

         if ($t3->response["walletResponseCode"] == "00") {
            $payment_card["paymentMeanId"] = $t3->response["paymentMeanId"];
         }
         $payment_card["data"] = $t3->response;
         $payment_card = PaymentCard::create($payment_card);
         $order = $this->valideOrder($session->id, $payment_card);

         return view("sherlock.redirect", ["url" => env("SHOP_URL") . "/orders\/" . $order->ref]);
      } else {
         return view("sherlock.error_payment", ["code" => $t2->response["responseCode"], "msg" => SherlockResponse::responseCode[$t2->response["responseCode"]]]);
         /*return [
            "status" => "failed",
            "code" => $t2->response["responseCode"],
            "msg" => SherlockResponse::responseCode[$t2->response["responseCode"]]
         ];*/
      }
   }
   public function test()
   {

      return view("sherlock.error_payment", ["code" => 50, "msg" => "hello world"]);
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
      $subscription = StripeSubscription::find($id);
      $data = [

         "cardExpiryDate" => "202212",
         "cardNumber" => "5017679100900100",
         "interfaceVersion" => "WR_WS_2.3",
         "merchantWalletId" => "iDWal1",
         "paymentMeanAlias" => "myvisacard",
         "paymentMeanBrand" => "CB",


      ];
      /* $data=[
            "amount"=> "25000",
            "captureDay"=> "0",
            "captureMode"=> "AUTHOR_CAPTURE",
            "cardCSCValue"=> "123",
            "cardExpiryDate"=> "202212",
            "cardNumber"=> "5017679110320521",
            "currencyCode"=> "978",
            "interfaceVersion"=> "IR_WS_2.3",
            "orderChannel"=> "INTERNET",
            "orderId"=> " ORD101",
            "returnContext"=> " ReturnContext",
            "transactionOrigin"=> " SO_WEBAPPLI",
            "transactionReference"=> "TREFE2XA2012F",
      ];*/
      return $sherlock->walletOrder($data);
      //  return $subscription;

   }
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
      $amount = round($data['orderInput']['paid_total'], 2) * 100;
      $type = "payement_order";
      $sherlock = new Sherlocks();
      $dataSherlock = [
         "amount" => $amount,
         "captureDay" => "0",
         "captureMode" => "AUTHOR_CAPTURE",
         "cardCSCValue" => $request->cardCvc,
         "cardExpiryDate" => $request->cardExpiry,
         "cardNumber" =>  $request->cardNumber,
         "currencyCode" => "978",
         "interfaceVersion" => "IR_WS_2.9",
         "merchantTransactionDateTime" => Carbon::now()->toDateTimeLocalString(),
         "fraudData" => ["challengeMode3DS" => "CHALLENGE_MANDATE"],
         "orderChannel" => "INTERNET",
         "orderId" =>    $data['orderInput']['ref'],
         "transactionReference" => "TREFEXA2015",
      ];
      $res = $sherlock->cardCheckEnrollment($dataSherlock, $user);
      $data["cardCheckEnrollment"] = $res->id;
      $stripeSession->data = $data;
      $stripeSession->save();

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

   public function valideOrder($session_id, $payment_card)
   {
      $session = StripeSession::find($session_id);
      $data = $session['data'];
      $data['orderInput']['customer_contact'] = 0;
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
         $subscription->payment_method_id = $payment_card->paymentMeanId;
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
