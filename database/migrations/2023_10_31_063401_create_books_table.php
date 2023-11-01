<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id(); // Auto-incremental primary key
            $table->string('title');
            $table->string('author');
            $table->string('genre');
            $table->text('description');
            $table->string('isbn');
            $table->string('image');
            $table->date('published');
            $table->string('publisher');

            $table->timestamps(); // Created_at and updated_at columns
        });
    }

    public function down()
    {
        Schema::dropIfExists('books');
    }
}

