<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableRepair extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();
            $table->double("amount");
            $table->double("total_amount");
            $table->double("total_paid")->default(0);
            $table->string("status")->default("pending");
            $table->text("obs")->nullable();
            $table->timestamp("receive_at")->nullable();
            $table->timestamp("fixed_at")->nullable();
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->on("users")->references("id");
            $table->timestamps();
        });
        Schema::create('repair_item',function (Blueprint $table){
            $table->id();
            $table->double("price");
            $table->double("total_price");
            $table->unsignedBigInteger("repair_id");
            $table->unsignedBigInteger("repair_price_id");
            $table->foreign("repair_id")->on("repairs")->references("id");
            $table->foreign("repair_price_id")->on("repair_prices")->references("id");
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
       
        Schema::drop("repair_item");
        Schema::drop("repairs");
    }
}
