<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableNotice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->smallInteger("star");
            $table->text("comment");
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger("customer_id");
            $table->foreign("product_id")->references("id")->on("products");
            $table->foreign("customer_id")->references("id")->on("users");
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notices');
    }
}
