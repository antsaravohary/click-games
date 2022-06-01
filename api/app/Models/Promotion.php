<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promotion extends Model
{

    protected $table = 'promotions';

    public $guarded = [];

    protected $with = ['products'];

    /**
     * @return belongsToMany
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'promotion_product')
            ->withPivot('status')
            ->withTimestamps();
    }
    /**
     * @return belongsTo
     */
    public function promotion_type(): BelongsTo
    {
        return $this->belongsTo(PromotionType::class, 'promotion_type_id');
    }
}
