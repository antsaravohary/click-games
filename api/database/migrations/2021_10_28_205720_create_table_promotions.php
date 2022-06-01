<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePromotions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['pending', 'validated','expired'])->default('pending');
            $table->double('amount');
            $table->double('total_amount');
            $table->double('factor')->default(1);
            $table->boolean("paid");
            $table->unsignedBigInteger("delay");
            $table->timestamp("start_date")->nullable();
            $table->timestamp("end_date")->nullable();
            $table->timestamp("paid_at")->nullable();
            $table->timestamps();
        });
        Schema::create('promotion_product',function(Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('promotion_id');
            $table->unsignedBigInteger('product_id');
            $table->enum('status', ['pending', 'validated','expired'])->default('pending');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('promotion_id')->references('id')->on('promotions');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotion_product');
        Schema::dropIfExists('promotions');
    }
}
