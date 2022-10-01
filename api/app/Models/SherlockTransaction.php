<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SherlockTransaction extends Model
{
    protected $table = 'sherlock_transaction';

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
