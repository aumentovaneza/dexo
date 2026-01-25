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
        Schema::create('price_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pokemon_card_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->string('marketplace')->default('TCGPlayer');
            $table->integer('volume')->nullable();
            $table->timestamps();
            
            $table->index(['pokemon_card_id', 'created_at']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('price_history');
    }
};
