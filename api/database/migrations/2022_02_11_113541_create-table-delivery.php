<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableDelivery extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("delivery",function(Blueprint $table){
            $table->id();
            $table->string("tracking_number")->nullable();
            $table->string("tracking_url")->nullable();
            $table->string("status");
            $table->string("delay")->nullable();
            $table->unsignedBigInteger("sender_address_id");
            $table->unsignedBigInteger("receiver_address_id");
            $table->foreign("sender_address_id")->on("address")->references("id");
            $table->foreign("receiver_address_id")->on("address")->references("id");
            $table->timestamps();
        });
        Schema::table("repairs",function(Blueprint $table){
            $table->string("ref")->after("id");
            $table->unsignedBigInteger("send_delivery_id")->nullable();
            $table->unsignedBigInteger("return_delivery_id")->nullable();
            $table->foreign("send_delivery_id")->on("delivery")->references("id");
            $table->foreign("return_delivery_id")->on("delivery")->references("id");
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
