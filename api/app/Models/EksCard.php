<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EksCard extends Model
{
   protected $table="eks_card";
   public $guarded = [];
   protected $casts = [
    'data'   => 'json',
];
}
