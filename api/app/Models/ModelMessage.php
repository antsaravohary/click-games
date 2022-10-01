<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModelMessage extends Model
{
    use SoftDeletes;
    public $guarded = [];
    protected $table = "model_messages";
}
