<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnClickCollectToTableOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum("mode_click_collect",['full','partial','none'])->default("none")->nullable();
            $table->string("code_click_collect")->nullable();
            $table->boolean("click_collect_delivered")->nullable();
        
        });

        Schema::table("order_product",function(Blueprint $table){
            $table->string("code_click_collect")->nullable();
            $table->string("code_retrait_click_collect")->nullable();
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
        });
    }
}
