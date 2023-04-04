<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('buildings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image');
            $table->string('address');
            $table->date('deadline');

            $table->boolean('economical')->nullable(); // Класс жилья
            $table->boolean('comfort')->nullable(); // Класс жилья
            $table->boolean('business')->nullable(); // Класс жилья
            $table->boolean('elite')->nullable(); // Класс жилья

            $table->text('pricing_group')->nullable(); // Ценовая категория

            $table->boolean('landscaping')->nullable(); // Благоустройство двора
            $table->boolean('decoration')->nullable(); // Отделка под ключ
            $table->boolean('parking')->nullable(); // Подземный паркинг
            $table->boolean('brick')->nullable(); // Конструктив
            $table->boolean('river_view')->nullable();
            $table->boolean('forest')->nullable();
            $table->boolean('promo')->nullable();

            $table->boolean('no_cars')->nullable(); // двор без машин
            $table->float('floor_height', 2, 2)->default(2.7); // высота потолка
            $table->boolean('storage_room')->nullable(); // кладовые
            $table->boolean('panorama_windows')->nullable(); // панорамные окна

            $table->boolean('special')->nullable(); // услуги 0

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buildings');
    }
};
