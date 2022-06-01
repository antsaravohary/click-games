<?php

use App\Enums\CouponType;
use App\Enums\ProductType;
use App\Enums\ShippingType;
use App\Enums\WithdrawStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClickuniversTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping_classes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('amount');
            $table->string('is_global')->default(true);
            $table->enum('type', [
                ShippingType::FIXED,
                ShippingType::PERCENTAGE,
                ShippingType::FREE
            ])->default('fixed');
            $table->timestamps();
        });
        Schema::create('brand', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });


        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->text('description')->nullable();
            $table->json('image')->nullable();
            $table->enum(
                'type',
                [
                    CouponType::FIXED_COUPON,
                    CouponType::PERCENTAGE_COUPON,
                    CouponType::FREE_SHIPPING_COUPON
                ]
            )->default(CouponType::DEFAULT_COUPON);
            $table->float('amount')->default(0);
            $table->string('active_from');
            $table->string('expire_at');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
        Schema::create('types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('icon')->nullable();
            $table->json('image')->nullable();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("ref")->nullable(true);
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('types')->onDelete('cascade');
            $table->float('price')->nullable()->default(0);
            $table->float('sale_price')->nullable();
            $table->float('max_price')->nullable();
            $table->float('min_price')->nullable();
            $table->boolean("is_used")->nullable(true);
            $table->boolean("click_collect")->nullable(true);
            $table->boolean("pre_order")->nullable(true);
            $table->timestamp('release_date')->nullable(true);
            $table->string('sku')->nullable();
            $table->integer('quantity')->default(0);
            $table->boolean('in_stock')->default(true);
            $table->boolean('is_taxable')->default(false);
            $table->float("weight")->nullable(true);
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->foreign('brand_id')->references('id')->on('brand');
            $table->unsignedBigInteger('shipping_class_id')->nullable();
            $table->foreign('shipping_class_id')->references('id')->on('shipping_classes');
            $table->enum('status', ['publish', 'draft'])->default('publish');
            $table->enum(
                'product_type',
                [
                    ProductType::SIMPLE,
                    ProductType::VARIABLE,
                ]
            )->default(ProductType::SIMPLE);
            $table->string('unit');
            $table->string('height')->nullable();
            $table->string('width')->nullable();
            $table->string('length')->nullable();
            $table->json('image')->nullable();
            $table->json('gallery')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::create('order_status', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('serial');
            $table->string('color')->nullable();;
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('ref')->unique()->nullable(true);
            $table->string('tracking_number')->unique()->nullable(true);
            $table->unsignedBigInteger('customer_id');
            $table->string('customer_contact')->nullable();
            $table->unsignedBigInteger('status');
            $table->double('amount');
            $table->double('sales_tax')->nullable();
            $table->double('paid_total')->nullable();
            $table->double('total')->nullable();
            $table->unsignedBigInteger('coupon_id')->nullable();
            $table->double('discount')->nullable();
            $table->string('payment_id')->nullable();
            $table->string('payment_gateway')->nullable();
            $table->json('shipping_address')->nullable();
            $table->json('billing_address')->nullable();
            $table->unsignedBigInteger('logistics_provider')->nullable();
            $table->double('delivery_fee')->nullable();
            $table->string('delivery_time')->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('status')->references('id')->on('order_status');
            $table->foreign('customer_id')->references('id')->on('users');
        });

        Schema::create('variation_options', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('price');
            $table->string('sale_price')->nullable();
            $table->string('quantity');
            $table->boolean('is_disable')->default(false);
            $table->string('sku')->nullable();
            $table->json('options');
            $table->unsignedBigInteger('product_id')->nullable();
            $table->foreign('product_id')->references('id')->on('products');
            $table->timestamps();
        });

        Schema::create('order_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->string('order_quantity');
            $table->string('unit_price');
            $table->string('subtotal');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('product_id')->references('id')->on('products');
            $table->unsignedBigInteger('variation_option_id')->nullable(true);
            $table->foreign('variation_option_id')->references('id')->on('variation_options');
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('icon')->nullable();
            $table->json('image')->nullable();
            $table->text('details')->nullable();
            $table->unsignedBigInteger('parent')->nullable();
            $table->foreign('parent')->references('id')->on('categories');
            $table->unsignedBigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('types')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('category_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('category_id');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });



        Schema::create('tax_classes', function (Blueprint $table) {
            $table->id();
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('city')->nullable();
            $table->double('rate');
            $table->string('name')->nullable();
            $table->integer('is_global')->nullable();
            $table->integer('priority')->nullable();
            $table->boolean('on_shipping')->default(1);
            $table->timestamps();
        });

        Schema::create('address', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type');
            $table->boolean('default')->default(false);
            $table->json('address');
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->json('options');
            $table->timestamps();
        });

        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->json('avatar')->nullable();
            $table->text('bio')->nullable();
            $table->json('socials')->nullable();
            $table->string('contact')->nullable();
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('users');

            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_active')->default(1);
            $table->string('stripe_id')->nullable(true);
        });

        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->string('url')->default('');
            $table->timestamps();
        });

        Schema::create('faq', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->text('content');
            $table->unsignedBigInteger('status');
            $table->unsignedBigInteger('user_id');
            $table->foreign("user_id")->references('id')->on('users');
            $table->timestamps();
        });
        Schema::create('faq_request', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->text('message');
            $table->string('name');
            $table->string('email');
            $table->string('contact_number');
            $table->unsignedBigInteger("status")->default(0);
            $table->timestamps();
        });

        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('icon')->nullable();
            $table->json('image')->nullable();
            $table->text('details')->nullable();
            $table->unsignedBigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('types');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('product_tag', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('tag_id');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        });
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id');
            $table->foreign('owner_id')->references('id')->on('users');
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->json('cover_image')->nullable();
            $table->json('logo')->nullable();
            $table->boolean('is_active')->default(false);
            $table->json('address')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id')->after('price')->nullable();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
        });


        Schema::create('balances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id');
            $table->foreign('shop_id')->references('id')->on('shops');
            $table->double('admin_commission_rate')->nullable();
            $table->double('total_earnings')->default(0);
            $table->double('withdrawn_amount')->default(0);
            $table->double('current_balance')->default(0);
            $table->json('payment_info')->nullable();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id')->nullable();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
        });

        Schema::create('category_shop', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id');
            $table->unsignedBigInteger('category_id');
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });

        Schema::create('withdraws', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id');
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->float('amount');
            $table->string('payment_method')->nullable();
            $table->enum('status', [
                WithdrawStatus::APPROVED,
                WithdrawStatus::PROCESSING,
                WithdrawStatus::REJECTED,
                WithdrawStatus::PENDING,
                WithdrawStatus::ON_HOLD,
            ])->default(WithdrawStatus::PENDING);
            $table->text('details')->nullable();
            $table->text('note')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('name');
            $table->unsignedBigInteger('shop_id')->nullable();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->timestamps();
        });


   
        
        Schema::create('attribute_values', function (Blueprint $table) {
            $table->id();
            $table->string('meta')->nullable(true);
            $table->string('value');
            $table->unsignedBigInteger('attribute_id');
          
            $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade');
          
            $table->timestamps();
        });

        

        Schema::create('attribute_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attribute_value_id');
            $table->foreign('attribute_value_id')->references('id')->on('attribute_values')->onDelete('cascade');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id')->after('coupon_id')->nullable();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->unsignedBigInteger('parent_id')->after('coupon_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('orders')->onDelete('cascade');
        });
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('provider_user_id');
            $table->string('provider');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('brand');
        Schema::dropIfExists('shipping_classes');
        Schema::dropIfExists('shipping_classes');
        Schema::dropIfExists('coupons');
        Schema::dropIfExists('types');
        Schema::dropIfExists('products');
        Schema::dropIfExists('order_status');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_product');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('category_product');
        Schema::dropIfExists('attributes');
        Schema::dropIfExists('attribute_values');
        Schema::dropIfExists('attribute_product');
        Schema::dropIfExists('tax_classes');
        Schema::dropIfExists('address');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('user_profiles');
        Schema::dropIfExists('attachments');
        Schema::dropIfExists('withdraws');
        Schema::dropIfExists('store_settings');
        Schema::dropIfExists('variation_options');
        Schema::dropIfExists('product_tag');
        Schema::dropIfExists('tags');
    }
}
