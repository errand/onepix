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

            $table->boolean('building_class')->nullable(); // Класс жилья
            $table->text('pricing_group')->nullable(); // Ценовая категория

            $table->integer('floors')->nullable(); // Кол-во этажей

            $table->boolean('yard')->nullable(); // Благоустройство двора
            $table->boolean('finishing')->nullable(); // Отделка под ключ
            $table->boolean('parking')->nullable(); // Подземный паркинг
            $table->text('constructive')->nullable(); // Конструктив
            $table->boolean('river')->nullable();
            $table->boolean('forest')->nullable();
            $table->boolean('sale')->nullable();

            $table->boolean('without_cars')->nullable(); // двор без машин
            $table->float('ceiling', 2, 2)->default(2.7); // высота потолка
            $table->boolean('pantries')->nullable(); // кладовые
            $table->boolean('windows')->nullable(); // панорамные окна

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
