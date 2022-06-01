<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromotionType extends Model
{
    use HasFactory;
    protected $table = 'promotion_type';
    public $guarded = [];
    protected $casts = [
        'options' => 'json',
        'image'=>'json'
    ];
}
