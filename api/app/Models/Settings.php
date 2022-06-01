<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    protected $table = 'settings';

    public $guarded = [];

    protected $casts = [
        'options'   => 'json',
    ];
}
