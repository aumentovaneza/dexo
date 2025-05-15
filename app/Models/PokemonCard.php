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
        'tcg_id',
        'supertype',
        'subtypes',
        'types',
        'hp',
        'level',
        'evolves_from',
        'evolves_to',
        'rules',
        'ancient_trait',
        'abilities',
        'attacks',
        'weaknesses',
        'resistances',
        'retreat_cost',
        'converted_retreat_cost',
        'set',
        'set_details',
        'number',
        'artist',
        'rarity',
        'flavor_text',
        'national_pokedex_numbers',
        'legalities',
        'regulation_mark',
        'images',
        'tcgplayer',
        'cardmarket',
    ];

    protected $casts = [
        'subtypes' => 'array',
        'types' => 'array',
        'evolves_to' => 'array',
        'rules' => 'array',
        'ancient_trait' => 'array',
        'abilities' => 'array',
        'attacks' => 'array',
        'weaknesses' => 'array',
        'resistances' => 'array',
        'retreat_cost' => 'array',
        'set_details' => 'array',
        'national_pokedex_numbers' => 'array',
        'legalities' => 'array',
        'images' => 'array',
        'tcgplayer' => 'array',
        'cardmarket' => 'array',
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

    /**
     * Get the card's small image URL
     */
    public function getSmallImageUrlAttribute()
    {
        return $this->images['small'] ?? null;
    }

    /**
     * Get the card's large image URL
     */
    public function getLargeImageUrlAttribute()
    {
        return $this->images['large'] ?? null;
    }

    /**
     * Check if the card is legal in standard format
     */
    public function isLegalInStandard()
    {
        return isset($this->legalities['standard']) && $this->legalities['standard'] === 'Legal';
    }

    /**
     * Check if the card is legal in expanded format
     */
    public function isLegalInExpanded()
    {
        return isset($this->legalities['expanded']) && $this->legalities['expanded'] === 'Legal';
    }

    /**
     * Check if the card is legal in unlimited format
     */
    public function isLegalInUnlimited()
    {
        return isset($this->legalities['unlimited']) && $this->legalities['unlimited'] === 'Legal';
    }
}
