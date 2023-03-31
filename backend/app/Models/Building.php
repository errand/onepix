<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Building extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    /**
     * Get the Buildings for the Metro.
     */
    public function metros(): BelongsToMany
    {
        return $this->belongsToMany(Metro::class);
    }
}
