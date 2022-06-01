<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnStatusToTableStripeSubscription extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("stripe_subscription", function (Blueprint $table) {
            $table->boolean("status");
            $table->integer("credit")->nullable(true);
        });
        Schema::table("users", function (Blueprint $table) {
            $table->unsignedBigInteger("stripe_subscription_id")->nullable();
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
        //
    }
}
