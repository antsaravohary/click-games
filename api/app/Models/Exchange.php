<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class Exchange.
 *
 * @package namespace App\Entities;
 */
class Exchange extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $guarded = [];
    /**
     * @return BelongsTo
     */
    public function sender_address(): BelongsTo
    {
        return $this->belongsTo(Address::class, 'send_address_id');
    }
    /**
     * @return BelongsTo
     */
    public function send_delivery(): BelongsTo
    {
        return $this->belongsTo(Delivery::class, 'send_delivery_id');
    }
    /**
     * @return BelongsTo
     */
    public function return_delivery(): BelongsTo
    {
        return $this->belongsTo(Delivery::class, 'return_delivery_id');
    }
    /**
     * @return BelongsTo
     */
    public function shop_product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'shop_product_id');
    }
    /**
     * @return BelongsTo
     */
    public function customer_product(): BelongsTo
    {
        return $this->belongsTo(CustomerProduct::class, 'customer_product_id');
    }
        /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

        /**
     * @return BelongsTo
     */
    public function payment_info(): BelongsTo
    {
        return $this->belongsTo(PaymentInfo::class, 'payment_info_id');
    }
}
