<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSherlockTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("users", function (Blueprint $table) {
            $table->string("merchantWalletId")->nullable();
        });
        Schema::create("sherlock_transaction", function (Blueprint $table) {
            $table->id();
            $table->string("method");
            $table->text("description")->nullable();
            $table->json("data")->nullable();
            $table->json("response")->nullable();
            $table->string("status")->nullable();
            $table->timestamps();
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->on("users")->references("id");
        });
        Schema::create("payment_card", function (Blueprint $table) {
            $table->id();
            $table->string("paymentMeanId");
            $table->text("number")->nullable();
            $table->json("expiry")->nullable();
            $table->json("cvc")->nullable();
            $table->string("brand")->nullable();
            $table->timestamps();
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->on("users")->references("id");
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
