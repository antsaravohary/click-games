<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableProductAds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_ads', function (Blueprint $table) {
            $table->id();
            $table->string("google_merchant_state")->nullable();
            $table->timestamp("google_merchant_at")->nullable();
            $table->boolean("google_merchant_need_update")->boolean()->default(true);
            $table->timestamps();
        });
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger("product_ads_id")->nullable();
            $table->foreign("product_ads_id")->on("product_ads")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_product_ads');
    }
}
