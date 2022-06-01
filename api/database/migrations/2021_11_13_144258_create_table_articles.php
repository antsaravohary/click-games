<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableArticles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("slug");
            $table->string("type");

            $table->timestamps();
        });
        Schema::create('items_article', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("pos")->nullable();
            $table->string("number")->nullable();
            $table->string("title");
            $table->string("type");
            $table->text("content");
            $table->unsignedBigInteger("article_id")->nullable();
            $table->unsignedBigInteger("parent_id")->nullable();
            $table->foreign("article_id")->on("articles")->references("id")->onDelete('cascade');;
            $table->foreign("parent_id")->on("items_article")->references("id")->onDelete('cascade');
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
        Schema::dropIfExists('items_article');
        Schema::dropIfExists('articles');
    }
}
