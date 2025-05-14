<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPokemonCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pokemon_card_id',
        'quantity',
        'tags',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'tags' => 'json',
    ];

    /**
     * Get the user that owns the collection.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the Pokémon card record.
     */
    public function pokemonCard(): BelongsTo
    {
        return $this->belongsTo(PokemonCard::class);
    }
}
