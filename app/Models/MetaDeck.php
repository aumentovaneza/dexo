<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MetaDeck extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'format',
        'usage_rate',
        'win_rate',
        'key_cards',
        'strategy',
        'thumbnail'
    ];

    protected $casts = [
        'usage_rate' => 'float',
        'win_rate' => 'float',
        'key_cards' => 'array'
    ];

    /**
     * Get the decks based on this meta deck
     */
    public function decks(): HasMany
    {
        return $this->hasMany(Deck::class, 'meta_deck_id');
    }
}
