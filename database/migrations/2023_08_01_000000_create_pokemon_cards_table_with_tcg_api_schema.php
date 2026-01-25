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
            $table->string('tcg_id')->unique();
            $table->string('name');
            $table->string('supertype')->nullable(); // Pokémon, Trainer, Energy
            $table->json('subtypes')->nullable(); // e.g., ['Basic', 'EX']
            $table->json('types')->nullable(); // e.g., ['Fire', 'Water']
            $table->string('hp')->nullable();
            $table->string('level')->nullable();
            $table->string('evolves_from')->nullable();
            $table->json('evolves_to')->nullable();
            $table->json('rules')->nullable();
            $table->json('ancient_trait')->nullable();
            $table->json('abilities')->nullable();
            $table->json('attacks')->nullable();
            $table->json('weaknesses')->nullable();
            $table->json('resistances')->nullable();
            $table->json('retreat_cost')->nullable();
            $table->integer('converted_retreat_cost')->nullable();
            $table->string('set')->nullable();
            $table->json('set_details')->nullable();
            $table->string('number')->nullable();
            $table->string('artist')->nullable();
            $table->string('rarity')->nullable();
            $table->string('flavor_text')->nullable();
            $table->json('national_pokedex_numbers')->nullable();
            $table->json('legalities')->nullable();
            $table->string('regulation_mark')->nullable();
            $table->json('images')->nullable();
            $table->json('tcgplayer')->nullable();
            $table->json('cardmarket')->nullable();
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
