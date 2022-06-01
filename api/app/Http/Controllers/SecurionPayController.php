<?php

namespace App\Http\Controllers;

use App\Models\PaymentInfo;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use SecurionPay\Request\ChargeRequest;
use SecurionPay\SecurionPayGateway;

class SecurionPayController extends Controller
{
    private $securionPay;
    private  $orderRepository;
    public function __construct(OrderRepository $orderRepository)
    {
        $this->securionPay = new SecurionPayGateway('sk_test_maPZk4j3YzrdoeTmZEJqpWRT');
        $this->orderRepository = $orderRepository;
    }

    public function payment($token, Request $request)
    {
        $user = $request->user();
        $data = $this->orderRepository->prepareOrder($request['data'], $user);
        
        $chargeRequest = new ChargeRequest();
        $payment_info = PaymentInfo::create([
            "ip_client" => $this->getIPAddress(),
            "amount" => round($data['orderInput']['total'], 2),
        ]);
        $chargeRequest->amount($data['orderInput']['total'] * 100)->currency('EUR')->card($token)->metadata([]);
        $charge = $this->securionPay->createCharge($chargeRequest);
        // si donc on arrive ici le paiement est effectué avec succès
        return 200;
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
