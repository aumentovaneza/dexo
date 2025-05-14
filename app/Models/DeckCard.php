<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeckCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'deck_id',
        'pokemon_card_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    /**
     * Get the deck that this card belongs to.
     */
    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class);
    }

    /**
     * Get the Pokémon card record.
     */
    public function pokemonCard(): BelongsTo
    {
        return $this->belongsTo(PokemonCard::class);
    }
}
