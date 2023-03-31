<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Metro extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'color',
        'distance'
    ];

    /**
     * Get the Buildings for the Metro.
     */
    public function buildings(): BelongsToMany
    {
        return $this->belongsToMany(Building::class);
    }
}
