<?php

use App\Controller\StripeController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AttributeValueController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\TaxController;
use App\Enums\Permission;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerProductController;
use App\Http\Controllers\ExchangeController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ModelMessageController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\promotionController;
use App\Http\Controllers\PromotionTypeController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RefundController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\StripeSessionController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WithdrawController;
use App\Models\CustomerProduct;
use App\Repositories\TicketRepository;

Route::post('/register', 'App\Http\Controllers\UserController@register');
Route::get('/outil-magic/{id}', 'App\Http\Controllers\OutilMagicController@removeBackground');
Route::post('/token', 'App\Http\Controllers\UserController@token');
Route::post('/forget-password', 'App\Http\Controllers\UserController@forgetPassword');
Route::post('/check-password', 'App\Http\Controllers\UserController@checkPassword');
Route::post('/verify-forget-password-token', 'App\Http\Controllers\UserController@verifyForgetPasswordToken');
Route::post('/reset-password', 'App\Http\Controllers\UserController@resetPassword');
Route::post('/contact', 'App\Http\Controllers\UserController@contactAdmin');
Route::post('/social-login-token', 'App\Http\Controllers\UserController@socialLogin');

Route::post('/stripe-create', 'App\Http\Controllers\StripeController@create');
Route::delete('/stripe-card-delete/{id}', 'App\Http\Controllers\StripeController@removeCard');
Route::post('/stripe/subscription/{priceId}', 'App\Http\Controllers\StripeController@subscription');

Route::post('/stripe/subscription-portal/', 'App\Http\Controllers\StripeController@subscriptionPortal');
Route::post('/stripe/webhook', 'App\Http\Controllers\StripeController@webhook');

Route::post('/tigo/test', 'App\Http\Controllers\ControllerMoneyTigo@test');
Route::post('/tigo/webhook', 'App\Http\Controllers\ControllerMoneyTigo@webhook');
Route::post('/tigo/eks', 'App\Http\Controllers\EksController@eks');
Route::get('/stripe/card/{id}', 'App\Http\Controllers\StripeController@cardPayement');
Route::post('/stripe/subscription/active/{user_id}', 'App\Http\Controllers\StripeController@subscriptionActive');
Route::post('/label/{ref}', 'App\Http\Controllers\ColissimoController@label');
Route::post('/generate-label-colissimo/{id}', 'App\Http\Controllers\ColissimoController@generateLabel');
Route::post('/securion-pay/payment/{token}', 'App\Http\Controllers\SecurionPayController@payment');

Route::apiResource('articles', ArticleController::class, [
    'only' => ['index', 'show', 'update', 'store', 'destroy']
]);
Route::apiResource('messages', MessageController::class, [
    'only' => ['index']
]);
Route::apiResource('platforms', PlatformController::class, [
    'only' => ['index']
]);
Route::apiResource('purchase-games', PurchaseController::class, [
    'only' => ['index', 'show', 'store', 'update', 'destroy']
]);
Route::apiResource('products', ProductController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('games', GameController::class, [
    'only' => ['index', 'show', 'store', 'destroy']
]);
Route::apiResource('brands', BrandController::class, [
    'only' => ['index', 'show', "store", 'update']
]);

Route::apiResource('notices', NoticeController::class, [
    'only' => ['store', 'show', 'index']
]);
Route::apiResource('types', TypeController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('attachments', AttachmentController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('categories', CategoryController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('tags', TagController::class, [
    'only' => ['index', 'show']
]);

Route::get('fetch-parent-category', 'App\Http\Controllers\CategoryController@fetchOnlyParent');

Route::apiResource('coupons', CouponController::class, [
    'only' => ['index', 'show']
]);

Route::post('coupons/verify', 'App\Http\Controllers\CouponController@verify');


Route::apiResource('order_status', OrderStatusController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('attributes', AttributeController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('all-shop', ShopController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('shippings', ShippingController::class, [
    'only' => ['index']
]);

Route::apiResource('attribute-values', AttributeValueController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('settings', SettingsController::class, [
    'only' => ['index']
]);

Route::apiResource('faqs', FaqController::class, [
    'only' => ['index', 'show', 'store', 'update', 'destroy']
]);
Route::get('me', 'App\Http\Controllers\UserController@me');
Route::group(['middleware' => ['can:' . Permission::CUSTOMER, 'auth:sanctum']], function () {
    Route::post('/logout', 'App\Http\Controllers\UserController@logout');
    Route::apiResource('refunds', RefundController::class, [
        'only' => ['index',]
    ]);

    Route::apiResource('customer-product', CustomerProductController::class, [
        'only' => ['index', 'show']
    ]);
    Route::apiResource('messages', MessageController::class, [
        'only' => ['store']
    ]);
    Route::apiResource('orders', OrderController::class, [
        'only' => ['index', 'show', 'store','update']
    ]);
    Route::apiResource('transactions', TransactionController::class, [
        'only' => ['index', 'show']
    ]);
    Route::apiResource('subscriptions', SubscriptionController::class, [
        'only' => ['index', 'show']
    ]);

    Route::apiResource('repairs', RepairController::class, [
        'only' => ['index', 'show', 'store', 'update']
    ]);
    Route::get('orders/tracking_number/{tracking_number}', 'App\Http\Controllers\OrderController@findByTrackingNumber');
    Route::apiResource('attachments', AttachmentController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::post('checkout/verify', 'App\Http\Controllers\CheckoutController@verify');

    Route::put('users/{id}', 'App\Http\Controllers\UserController@update');
    Route::post('/change-password', 'App\Http\Controllers\UserController@changePassword');
    Route::apiResource('address', AddressController::class, [
        'only' => ['destroy', 'show']
    ]);
    Route::apiResource('tickets', TicketController::class, [
        'only' => ['index', 'store', 'show', 'update']
    ]);
    Route::apiResource('exchanges', ExchangeController::class, [
        'only' => ['index', 'store', 'show', 'update']
    ]);
    //dashboard
    Route::get('dashboard-info', 'App\Http\Controllers\DashboardController@info');
    //stripe action
    Route::get('stripe/cards', 'App\Http\Controllers\StripeController@cardPayementList');
    Route::post('stripe/card/save/{token}', 'App\Http\Controllers\StripeController@saveCard');
    Route::post('stripe/create/payment', 'App\Http\Controllers\StripeController@createPayment');
});

Route::group(
    ['middleware' => ['permission:' . Permission::STAFF . '|' . Permission::STORE_OWNER, 'auth:sanctum']],
    function () {
        Route::get('analytics', 'App\Http\Controllers\AnalyticsController@analytics');
        Route::get('product-generate-sku', 'App\Http\Controllers\ProductController@generateSKU');
        Route::get('check-click-collect-code/{code}', 'App\Http\Controllers\OrderController@checkCodeClickCollect');
        Route::apiResource('products', ProductController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('model-messages', ModelMessageController::class, [
            'only' => ['store', 'update', 'destroy', 'index', 'show']
        ]);
        Route::apiResource('attributes', AttributeController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);

        Route::apiResource('attribute-values', AttributeValueController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('refunds', RefundController::class, [
            'only' => ['store']
        ]);
        Route::apiResource('orders', OrderController::class, [
            'only' => ['destroy']
        ]);
        Route::get('popular-products', 'App\Http\Controllers\AnalyticsController@popularProducts');
        Route::apiResource('tags', TagController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);

        Route::apiResource('promotion-type', PromotionTypeController::class, [
            'only' => ['index', 'show']
        ]);
    }
);
Route::group(
    ['middleware' => ['permission:' . Permission::STORE_OWNER, 'auth:sanctum']],
    function () {
        Route::apiResource('all-shop', ShopController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('withdraws', WithdrawController::class, [
            'only' => ['store', 'index', 'show']
        ]);
        Route::apiResource('promotions', promotionController::class, [
            'only' => ['index', 'store', 'show']

        ]);

        Route::post('users/add-staff', 'App\Http\Controllers\ShopController@addStaff');
        Route::get('staffs/{id}', 'App\Http\Controllers\UserController@showStaff');
        Route::put('staffs/{id}', 'App\Http\Controllers\UserController@editStaff');
        Route::delete('users/remove-staff/{id}', 'App\Http\Controllers\ShopController@removeStaff');
        Route::get('staffs', 'App\Http\Controllers\UserController@staffs');
        Route::get('my-shops', 'App\Http\Controllers\ShopController@myShops');
    }
);


Route::group(['middleware' => ['permission:' . Permission::SUPER_ADMIN, 'auth:sanctum']], function () {
    Route::apiResource('types', TypeController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('stripe-session', StripeSessionController::class, [
        'only' => ['show', 'index']
    ]);
    Route::apiResource('contacts', ContactController::class, [
        'only' => ['store', 'update', 'destroy', 'index']
    ]);
    Route::apiResource('withdraws', WithdrawController::class, [
        'only' => ['update', 'destroy']
    ]);
    Route::apiResource('categories', CategoryController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);

    Route::apiResource('coupons', CouponController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('order_status', OrderStatusController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('promotion-type', PromotionTypeController::class, [
        'only' => ['store', 'update', 'show', 'destroy']
    ]);
    Route::apiResource('promotions', promotionController::class, [
        'only' => ['update']

    ]);

    Route::apiResource('settings', SettingsController::class, [
        'only' => ['store']
    ]);
    Route::apiResource('users', UserController::class);
    Route::post('users/ban-user', 'App\Http\Controllers\UserController@banUser');
    Route::post('users/active-user', 'App\Http\Controllers\UserController@activeUser');
    Route::post('refunds/finish', 'App\Http\Controllers\RefundController@finishRefund');
    Route::apiResource('taxes', TaxController::class);
    Route::apiResource('shipping', ShippingController::class);
    Route::post('approve-shop', 'App\Http\Controllers\ShopController@approveShop');
    Route::post('disapprove-shop', 'App\Http\Controllers\ShopController@disApproveShop');
    Route::post('approve-withdraw', 'App\Http\Controllers\WithdrawController@approveWithdraw');
});
