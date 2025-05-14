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
        Schema::create('pokemon_cards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('supertype')->nullable(); // Pokémon, Trainer, Energy
            $table->string('subtype')->nullable(); // e.g., Basic, Stage 1
            $table->string('type')->nullable(); // e.g., Fire, Water
            $table->string('set')->nullable();
            $table->string('rarity')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_legal')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pokemon_cards');
    }
};
