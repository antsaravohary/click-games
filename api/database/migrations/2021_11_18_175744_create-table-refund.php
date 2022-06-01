<?php

use App\Enums\WithdrawStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableRefund extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("refunds", function (Blueprint $table) {
            $table->id();
            $table->float("amount");
            $table->string("reason");
            $table->enum('status', [
                WithdrawStatus::APPROVED,
                WithdrawStatus::PROCESSING,
                WithdrawStatus::REJECTED,
                WithdrawStatus::PENDING,
                WithdrawStatus::ON_HOLD,
            ])->default(WithdrawStatus::PENDING);
            $table->unsignedBigInteger("order_id");
            $table->unsignedBigInteger("customer_id");
            $table->foreign("order_id")->on("orders")->references("id");
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
        //
    }
}
