<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class CustomerProduct.
 *
 * @package namespace App\Models;
 */
class CustomerProduct extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
    /**
     * @return BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class, "product_id");
    }
}
