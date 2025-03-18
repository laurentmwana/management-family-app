<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class People extends Model
{
    /** @use HasFactory<\Database\Factories\PeopleFactory> */
    use HasFactory;

    protected $fillable = ['full_name', 'gender', 'relation_family', 'image', 'family_id', 'birth'];

    public function family(): BelongsTo
    {
        return $this->belongsTo(Family::class);
    }
}
