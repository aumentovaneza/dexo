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
        Schema::create('trade_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trade_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('pokemon_card_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->enum('condition', ['Mint', 'Near Mint', 'Excellent', 'Good', 'Played'])->default('Near Mint');
            $table->boolean('is_offering')->default(true); // true = offering, false = requesting
            $table->decimal('estimated_value', 8, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['trade_id', 'is_offering']);
            $table->index(['user_id', 'pokemon_card_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trade_items');
    }
};
