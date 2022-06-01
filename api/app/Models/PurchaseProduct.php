<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseProduct extends Model
{
    protected $table="purchase_product";
    public $guarded = [];
    protected $casts = [

        'gallery' => 'json',
    ];
}
