<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnExchangeableToTableProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("products", function (Blueprint $table) {
            $table->boolean("exchangeable")->nullable();
          
        });
       
        Schema::create('customer_products', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger("product_id");
			$table->unsignedBigInteger("user_id");

			$table->foreign("product_id")->on("products")->references("id");
			$table->foreign("user_id")->on("users")->references("id");
			$table->boolean("status")->nullable();

			$table->timestamps();
		});
        Schema::table("exchanges",function(Blueprint $table){
            $table->dropForeign(["customer_product_id"]);
            $table->dropColumn("customer_product_id");
            $table->unsignedBigInteger("customer_product_id")->nullable();
            $table->foreign("customer_product_id")->on("customer_products")->references("id");
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
