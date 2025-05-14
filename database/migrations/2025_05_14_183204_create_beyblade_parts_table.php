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
        Schema::create('beyblade_parts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('part_type', ['Layer', 'Disk', 'Driver']);
            $table->unsignedTinyInteger('attack')->default(0);
            $table->unsignedTinyInteger('defense')->default(0);
            $table->unsignedTinyInteger('stamina')->default(0);
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beyblade_parts');
    }
};
