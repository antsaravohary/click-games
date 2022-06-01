<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableStripeSubscription extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stripe_subscription', function (Blueprint $table) {
            $table->id();
            $table->string("subscription_id")->nullable();
            $table->timestamp("current_period_start")->nullable(true);
            $table->timestamp("current_period_end")->nullable();
            $table->string("type")->nullable();
            $table->timestamps();
        });
        Schema::table('shops',function(Blueprint $table){
            $table->boolean('is_expired')->nullable(true);
            $table->unsignedBigInteger('stripe_subscription_id')->nullable();
            $table->foreign("stripe_subscription_id")->on("stripe_subscription")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropColumns("shops","isExpired");
        Schema::dropColumns("shops","stripe_subscription_id");
        Schema::dropIfExists('stripe_subscription');
    }
}
