<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateExchangesTable.
 */
class CreateExchangesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('exchanges', function (Blueprint $table) {
			$table->id();
			$table->string("ref")->nullable();

			$table->unsignedBigInteger("customer_product_id");
			$table->unsignedBigInteger("shop_product_id");
			$table->string("status");
			$table->float("amount");
			$table->text("obs")->nullable();
			$table->float("total_paid")->default(0);
			$table->timestamp("received_at")->nullable();
			$table->timestamp("paid_at")->nullable();
			$table->timestamp("valid_at")->nullable();
			$table->timestamp("return_at")->nullable();
			$table->unsignedBigInteger("send_delivery_id")->nullable();
			$table->unsignedBigInteger("return_delivery_id")->nullable();
			$table->timestamps();
			$table->foreign("send_delivery_id")->on("delivery")->references("id");
			$table->foreign("return_delivery_id")->on("delivery")->references("id");

			$table->foreign("customer_product_id")->on("products")->references("id");
			$table->foreign("shop_product_id")->on("products")->references("id");
			$table->unsignedBigInteger("user_id");
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
		Schema::drop('exchanges');
	}
}
