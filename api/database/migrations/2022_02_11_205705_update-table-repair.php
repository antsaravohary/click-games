<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTableRepair extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        Schema::table("repairs",function(Blueprint $table){
            $table->unsignedBigInteger("model_brand_id")->nullable();
            $table->foreign("model_brand_id")->on("model_brand")->references("id");
            $table->timestamp("received_at")->nullable();
            $table->timestamp("paid_at")->nullable();
            $table->timestamp("foxed_at")->nullable();
            $table->timestamp("return_at")->nullable();
        });
        Schema::table("delivery",function(Blueprint $table){
            $table->string("company")->after("id");
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
