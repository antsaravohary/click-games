<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ModelBrand extends Model
{
    protected $table = 'model_brand';

    public $guarded = [];

    protected $casts = [
    ];
    /**
     *  @return BelongsTo
     */
public function brand(){
    return $this->belongsTo(Brand::class,"brand_id");
}
      /**
     * @return HasMany
     */
    public function repair_prices():HasMany
    {
        return $this->hasMany(RepairPrice::class,'model_brand_id');
    }
}
