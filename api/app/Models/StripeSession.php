<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StripeSession extends Model
{
    use HasFactory;
    protected $table = 'stripe_session';

    protected $fillable = ['user_id', 'data'];

    protected $casts = [
        'data'  => 'json',
    ];

    /**
     * @return belongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
