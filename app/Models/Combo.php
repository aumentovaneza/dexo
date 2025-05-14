<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Combo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'layer_id',
        'disk_id',
        'driver_id',
        'notes',
    ];

    /**
     * Get the user that owns the combo.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the layer used in this combo.
     */
    public function layer(): BelongsTo
    {
        return $this->belongsTo(BeybladePart::class, 'layer_id');
    }

    /**
     * Get the disk used in this combo.
     */
    public function disk(): BelongsTo
    {
        return $this->belongsTo(BeybladePart::class, 'disk_id');
    }

    /**
     * Get the driver used in this combo.
     */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(BeybladePart::class, 'driver_id');
    }
}
