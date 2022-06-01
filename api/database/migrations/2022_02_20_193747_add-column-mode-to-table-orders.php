<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnModeToTableOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("orders", function (Blueprint $table) {
            $table->string("mode", 15)->nullable(true);
            $table->integer("credit")->default(0);
        });
        Schema::table("transactions", function (Blueprint $table) {
            $table->dropForeign(["payment_info_id"]);
            $table->foreign("payment_info_id")->on("payment_info")->references("id");
        });
        Schema::table("order_product", function (Blueprint $table) {
            $table->string("mode")->default("NONE");
        });
        Schema::table("stripe_subscription", function (Blueprint $table) {
            $table->string("payment_method_id")->nullable();
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
