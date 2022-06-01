<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateColumnTableOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("orders", function (
            Blueprint $table
        ) {
            $table->boolean("canceled")->nullable();
        });
        Schema::table("order_product", function (
            Blueprint $table
        ) {
            $table->boolean("canceled")->nullable();
            $table->boolean("click_collect")->nullable();
        });
        Schema::table("order_status", function (
            Blueprint $table
        ) {
            $table->tinyInteger("type")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::dropColumns("orders","canceled");
      Schema::dropColumns("order_product","canceled");
    }
}
