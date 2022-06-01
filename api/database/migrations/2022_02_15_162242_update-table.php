<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("delivery", function (Blueprint $table) {
            $table->double("weight")->nullable();
        });

        Schema::create('payment_info', function (Blueprint $table) {
            $table->id();
            $table->string("ip_client")->nullable();
            $table->double("amount")->nullable();
            $table->string("payment_intent_id")->nullable();
            $table->string("status")->default("pending");
            $table->json("payment_method_details")->nullable();
            $table->timestamps();
        });
        Schema::table("repairs", function (Blueprint $table) {
            $table->unsignedBigInteger("payment_info_id")->nullable();
            $table->foreign("payment_info_id")->on("payment_info")->references("id");
        });
        Schema::table("orders", function (Blueprint $table) {
            $table->unsignedBigInteger("payment_info_id")->nullable();
            $table->foreign("payment_info_id")->on("payment_info")->references("id");
        });
        Schema::table("transactions", function (Blueprint $table) {
            $table->string("type")->change();
            $table->unsignedBigInteger("payment_info_id")->nullable();
            $table->foreign("payment_info_id")->on("transactions")->references("id");
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_info');
    }
}
