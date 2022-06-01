<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableGames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('platforms', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("slug");
            $table->text("description");
            $table->timestamps();
        });
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("slug");
            $table->text("description");
            $table->integer("year");
            $table->integer("quantity");
            $table->float("buy_price");
            $table->float("sale_price");
            $table->unsignedBigInteger("platform_id");
            $table->foreign("platform_id")->on("platforms")->references("id");
            $table->timestamps();
        });
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->float("amount");
            $table->float("sales_tax")->default(0);
            $table->float("delivery_fee")->default(0);
            $table->float("paid_total")->default(0);
            $table->float("total");
            $table->string("status", 10);
            $table->string("tracking_number")->nullable();
            $table->string("shipping_company")->nullable();
            $table->unsignedBigInteger("address_id")->nullable();
            $table->unsignedBigInteger("user_id");
            $table->foreign("address_id")->on("address")->references("id");
            $table->foreign("user_id")->on("users")->references("id");
            $table->timestamps();
        });
        Schema::create("game_purchase", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("purchase_id");
            $table->unsignedBigInteger("game_id");
            $table->float("price");
            $table->integer("quantity");
            $table->float("total_price");
            $table->string("status", 10);
            $table->foreign("game_id")->on("games")->references("id");
            $table->foreign("purchase_id")->on("purchases")->references("id");
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
        Schema::drop("game_purchase");
        Schema::drop("purchases");
        Schema::drop("games");
        Schema::drop("platforms");


    }
}
