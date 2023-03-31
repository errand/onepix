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

            $table->text('building_class')->nullable(); // Класс жилья
            $table->text('pricing_group')->nullable();; // Ценовая категория

            $table->boolean('landscaping')->default(0); // Благоустройство двора
            $table->boolean('decoration')->default(0);; // Отделка под ключ
            $table->boolean('parking')->default(0);; // Подземный паркинг
            $table->text('constructive')->nullable(); // Конструктив
            $table->boolean('river_view')->default(0);;
            $table->boolean('forest')->default(0);;
            $table->boolean('promo')->default(0);;

            $table->boolean('no_cars')->default(0);; // двор без машин
            $table->float('floor_height', 2, 2)->default(2.7); // высота потолка
            $table->boolean('storage_room')->default(0);; // кладовые
            $table->boolean('panorama_windows')->default(0);; // панорамные окна

            $table->boolean('special')->default(0);; // услуги 0

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
