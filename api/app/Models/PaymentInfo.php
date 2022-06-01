<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentInfo extends Model
{
    protected $table = "payment_info";
    public $guarded = [];
    protected $casts = [
        'payment_method_details' => 'json',
    ];
}
