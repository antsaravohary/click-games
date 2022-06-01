<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnBalanceIdToTableUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("balances",function(Blueprint $table){
            $table->unsignedBigInteger("user_id")->nullable();
            $table->unsignedBigInteger("shop_id")->change()->nullable();
            $table->foreign("user_id")->on("users")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("balances",function(Blueprint $table){
            $table->dropForeign("user_id");
            $table->dropColumn("user_id");
        });
    }
}
