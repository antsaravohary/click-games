<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePromotionType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("promotion_type", function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("description");
            $table->double("price");
            $table->unsignedBigInteger("max_product");
            $table->json("options");
            $table->timestamps();
        });
        Schema::table("promotions", function (Blueprint $table) {
            $table->unsignedBigInteger("promotion_type_id");
            $table->foreign("promotion_type_id")->on("promotion_type")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropColumns("promotions", "promotion_type_id");
        Schema::drop("promotion_type");
    }
}
