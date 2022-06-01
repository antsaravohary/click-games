<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairItem extends Model
{
    protected $table="repair_item";
    public $guarded = [];

/**
 * @return BelongsTo
 */
public function repair_price(){
    $this->belongsTo(RepairPrice::class,"repair_price_id");
}
}
