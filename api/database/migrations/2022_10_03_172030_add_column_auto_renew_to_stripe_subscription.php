<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnAutoRenewToStripeSubscription extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::table('stripe_subscription', function (Blueprint $table) {
            $table->boolean("auto_renew")->default(true)->nullable();
        });
        Schema::create('subscription_invoice', function (Blueprint $table) {
            $table->id();
            $table->string("status")->default("pending");
            $table->string("object")->nullable();
            $table->float("amount")->nullable();
            $table->integer("time")->nullable();
            $table->timestamp("paid_at")->nullable();
            $table->unsignedBigInteger("stripe_subscription_id")->nullable();
            $table->foreign("stripe_subscription_id")->on("stripe_subscription")->references("id");
            $table->timestamps();
        });
        Schema::table('transactions', function (Blueprint $table) {
            $table->unsignedBigInteger("subscription_id")->nullable();
            $table->string("account_no")->nullable();
            $table->unsignedBigInteger("order_id")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stripe_subscription', function (Blueprint $table) {
            //
        });
    }
}
