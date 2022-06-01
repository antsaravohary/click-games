<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableTicket extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("customer_id");
            $table->unsignedBigInteger("shop_id");
            $table->string("subject");
            $table->smallInteger("priority");
            $table->boolean("status");
            $table->text("description");
            $table->unsignedBigInteger("order_id")->nullable();
            $table->foreign("customer_id")->on("users")->references("id");
            $table->foreign("shop_id")->references("id")->on("shops");
            $table->foreign("order_id")->references("id")->on("orders");
             $table->timestamps();
        });
        Schema::create('messages',function(Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('ticket_id');
            $table->unsignedBigInteger('user_id');
            $table->text("text");
            $table->foreign('ticket_id')->references('id')->on("tickets");
            $table->foreign('user_id')->references('id')->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('tickets');
    }
}
