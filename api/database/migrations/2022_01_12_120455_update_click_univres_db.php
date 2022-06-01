<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateClickUnivresDb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::table('brand', function (Blueprint $table) {
            $table->unsignedBigInteger("category_id")->nullable();
            $table->foreign("category_id")->on("categories")->references("id");
        });
        Schema::create('model_brand', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->unsignedBigInteger("brand_id");
            $table->foreign("brand_id")->on("brand")->references("id");
            $table->timestamps();
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->json("champ_required")->nullable();
            $table->string("type_label")->nullable();
        });
        Schema::table('types', function (Blueprint $table) {
            $table->unsignedBigInteger("category_id")->nullable();
            $table->foreign("category_id")->on("categories")->references("id");
        });
        Schema::create('product_information', function (Blueprint $table) {
            $table->id();
            $table->integer("year")->nullable();
            $table->integer("milage")->nullable();
            $table->string("licence")->nullable();
            $table->string("fuel")->nullable();
            $table->string("carburant")->nullable();
            $table->string("platform")->nullable();
            $table->integer("storage_capacity")->nullable();
            $table->integer("age")->nullable();
            $table->timestamps();
        });
        Schema::table("products", function (Blueprint $table) {
            $table->unsignedBigInteger("product_information_id")->nullable();
            $table->foreign("product_information_id")->on("product_information")->references("id");
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
