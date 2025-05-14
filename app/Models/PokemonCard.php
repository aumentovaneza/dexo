<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PokemonCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'supertype',
        'subtype',
        'type',
        'set',
        'rarity',
        'image_url',
        'is_legal',
    ];

    protected $casts = [
        'is_legal' => 'boolean',
    ];

    /**
     * Get the deck cards associated with this Pokémon card.
     */
    public function deckCards(): HasMany
    {
        return $this->hasMany(DeckCard::class);
    }

    /**
     * Get the user collections that contain this Pokémon card.
     */
    public function userCollections(): HasMany
    {
        return $this->hasMany(UserPokemonCollection::class);
    }
}
