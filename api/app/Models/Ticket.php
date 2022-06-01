<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    
    public $guarded = [];
    
    use HasFactory;

    /**
     * @return HasMany
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'ticket_id');
    }

    /**
     * @return BelongsTo
     */
    public function customer():BelongsTo
    {
        return $this->belongsTo(User::class,'customer_id');
    }
}
