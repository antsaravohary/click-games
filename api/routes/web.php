<?php

use App\Http\Controllers\GoogleShopController;
use App\Http\Controllers\SherlocksController;
use App\Mail\Contact;
use App\Mail\NewAvis;
use App\Models\Order;
use App\Mail\NewOrder;
use App\Models\Coupon;
use App\Mail\NewRefund;
use App\Mail\NewTicket;
use App\Mail\CodeRetrait;
use App\Mail\NewWithdraw;
use App\Mail\FirstContact;
use App\Mail\NewPromotion;
use App\Mail\OrderDispatch;
use Illuminate\Support\Str;
use App\Mail\FeedBackTicket;
use App\Mail\ForgetPassword;
use App\Mail\OrderCancelled;
use App\Mail\OrderValidated;
use App\Mail\OrderDispatched;
use App\Mail\ConditionUpdated;
use App\Mail\TicketInProgress;
use App\Mail\CustomerRegistered;
use App\Mail\ShopOwnerRegistered;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Mail\ConfirmRetraitClickCollect;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
});

Route::get('/email', function () {
    $order = Order::find(90);
    $coupon = Coupon::find(1);
    return (new CustomerRegistered())->to("orelien.soany@gmail.com");
});

Route::get('google/shopping/product', [GoogleShopController::class, 'listProduct']);
