<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableRepairPrices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("repair_prices",function(Blueprint $table){
            $table->id();
            $table->string("name");
            $table->double("price");
            $table->unsignedBigInteger("model_brand_id");
            $table->foreign("model_brand_id")->on("model_brand")->references("id");
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
        //
    }
}
