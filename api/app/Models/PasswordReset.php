<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'email', 'token'
    ];
}
