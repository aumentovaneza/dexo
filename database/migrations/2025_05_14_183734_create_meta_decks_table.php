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
        Schema::create('meta_decks', function (Blueprint $table) {
            $table->id();
            $table->string('format')->nullable(); // e.g., Standard
            $table->string('source')->nullable(); // e.g., LimitlessTCG
            $table->decimal('usage_rate', 5, 2)->nullable(); // %
            $table->decimal('win_rate', 5, 2)->nullable();  // %
            $table->json('deck_data')->nullable(); // Raw JSON from source
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meta_decks');
    }
};
