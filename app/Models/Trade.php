<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Trade extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipient_id',
        'trade_type',
        'status',
        'notes',
        'shipping_cost',
        'shipping_method',
        'tracking_number',
        'accepted_at',
        'completed_at',
        'expires_at',
    ];

    protected $casts = [
        'shipping_cost' => 'decimal:2',
        'accepted_at' => 'datetime',
        'completed_at' => 'datetime',
        'expires_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who initiated the trade.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the recipient of the trade.
     */
    public function recipient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    /**
     * Get the trade items.
     */
    public function tradeItems(): HasMany
    {
        return $this->hasMany(TradeItem::class);
    }

    /**
     * Get items being offered in the trade.
     */
    public function offering(): HasMany
    {
        return $this->tradeItems()->where('is_offering', true);
    }

    /**
     * Get items being requested in the trade.
     */
    public function requesting(): HasMany
    {
        return $this->tradeItems()->where('is_offering', false);
    }

    /**
     * Scope for pending trades.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for accepted trades.
     */
    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    /**
     * Scope for completed trades.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope for expired trades.
     */
    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<', now());
    }

    /**
     * Check if trade is expired.
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * Check if trade can be cancelled.
     */
    public function canBeCancelled(): bool
    {
        return in_array($this->status, ['pending', 'accepted']) && !$this->isExpired();
    }
}
