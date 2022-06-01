<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    protected $table = 'brand';

    public $guarded = [];

    protected $casts = [
    ];
    /**
     * @return HasMany
     */
    public function modeles():HasMany
    {
        return $this->hasMany(ModelBrand::class,'brand_id');
    }
       /**
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

}
