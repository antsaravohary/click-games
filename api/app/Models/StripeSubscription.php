<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class StripeSubscription extends Model
{
    use HasFactory;

    protected $table = 'stripe_subscription';

    protected $guarded=[];

    /**
     * @return HasOne
     */
    public function user():HasOne
    {
        return  $this->hasOne(User::class);
    }
}
