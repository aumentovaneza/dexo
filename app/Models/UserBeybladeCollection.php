<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserBeybladeCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'beyblade_part_id',
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
     * Get the Beyblade part record.
     */
    public function beybladePart(): BelongsTo
    {
        return $this->belongsTo(BeybladePart::class);
    }
}
