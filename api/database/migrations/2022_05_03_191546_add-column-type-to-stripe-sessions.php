<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnTypeToStripeSessions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("stripe_session", function (Blueprint $table) {
            $table->string("type")->nullable();
        });

        Schema::table("exchanges", function (Blueprint $table) {
            $table->json("data")->nullable();
            $table->unsignedBigInteger("payment_info_id")->nullable();
            $table->foreign("payment_info_id")->on("payment_info")->references("id");
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
