<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BeybladePart extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'part_type',
        'attack',
        'defense',
        'stamina',
        'image_url',
    ];

    protected $casts = [
        'attack' => 'integer',
        'defense' => 'integer',
        'stamina' => 'integer',
    ];

    /**
     * Get the user collections that contain this Beyblade part.
     */
    public function userCollections(): HasMany
    {
        return $this->hasMany(UserBeybladeCollection::class);
    }

    /**
     * Get the combos where this part is used as a layer.
     */
    public function layerCombos(): HasMany
    {
        return $this->hasMany(Combo::class, 'layer_id');
    }

    /**
     * Get the combos where this part is used as a disk.
     */
    public function diskCombos(): HasMany
    {
        return $this->hasMany(Combo::class, 'disk_id');
    }

    /**
     * Get the combos where this part is used as a driver.
     */
    public function driverCombos(): HasMany
    {
        return $this->hasMany(Combo::class, 'driver_id');
    }
}
