<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentCard extends Model
{
    protected $table = 'payment_card';

    public $guarded = [];

    protected $casts = [
        'data'   => 'json',
        'response'   => 'json',
    ];

    protected static function boot()
    {
        parent::boot();
    }
}
