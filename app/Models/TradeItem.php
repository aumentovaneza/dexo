<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TradeItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'trade_id',
        'user_id',
        'pokemon_card_id',
        'quantity',
        'condition',
        'is_offering',
        'estimated_value',
        'notes',
    ];

    protected $casts = [
        'estimated_value' => 'decimal:2',
        'is_offering' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the trade that owns the item.
     */
    public function trade(): BelongsTo
    {
        return $this->belongsTo(Trade::class);
    }

    /**
     * Get the user that owns the item.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the Pokemon card.
     */
    public function pokemonCard(): BelongsTo
    {
        return $this->belongsTo(PokemonCard::class);
    }

    /**
     * Scope for items being offered.
     */
    public function scopeOffering($query)
    {
        return $query->where('is_offering', true);
    }

    /**
     * Scope for items being requested.
     */
    public function scopeRequesting($query)
    {
        return $query->where('is_offering', false);
    }
}
