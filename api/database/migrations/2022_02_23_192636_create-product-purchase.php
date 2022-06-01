<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductPurchase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create("purchase_product", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("purchase_id")->nullable();
            $table->foreign("purchase_id")->on("purchases")->references("id");
            $table->string("name");
            $table->text("description");
            $table->string("type")->nullable();
            $table->double("price");
            $table->integer("quantity");
            $table->double("discount")->default(0);
            $table->double("total_price");
            $table->json('gallery')->nullable();
            $table->unsignedBigInteger("platform_id")->nullable();
            $table->foreign("platform_id")->on("platforms")->references("id");
            $table->unsignedBigInteger("brand_id")->nullable();
            $table->foreign("brand_id")->on("brand")->references("id");
            $table->unsignedBigInteger("modele_id")->nullable();
            $table->foreign("modele_id")->on("model_brand")->references("id");
            $table->timestamps();
        });
        Schema::table("messages", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->nullable()->change();
            $table->unsignedBigInteger("ticket_id")->nullable()->change();
            $table->string("type")->nullable();
            $table->boolean("data_is_avalaible")->default(0);
            $table->unsignedBigInteger("purchase_id")->nullable();
            $table->foreign("purchase_id")->on("purchases")->references("id");
            $table->json("data")->nullable(true);
            $table->timestamps();
        });
        Schema::table("purchases", function (Blueprint $table) {
            $table->unsignedBigInteger("sender_address_id")->nullable()->change();
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
