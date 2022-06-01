<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Delivery extends Model
{
    protected $table="delivery";
    public $guarded = [];


    /**
     * @return BelongsTo
     */
    public function receiver(){
        return $this->belongsTo(Address::class,'receiver_address_id');
    }

        /**
     * @return BelongsTo
     */
    public function sender(){
        return $this->belongsTo(Address::class,'sender_address_id');
    }
}
