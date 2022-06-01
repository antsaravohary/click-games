<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $table = 'orders';

    public $guarded = [];

    protected $casts = [
        'shipping_address' => 'json',
        'billing_address'  => 'json',
        'relay_point' => 'json'
    ];

    protected static function boot()
    {
        parent::boot();
        // Order by created_at desc
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }

    protected $with = ['customer', 'status', 'products'];

    /**
     * @return belongsToMany
     */
    public function products(): belongsToMany
    {
        return $this->belongsToMany(Product::class)
            ->withPivot('id','order_quantity', 'status','unit_price', 'subtotal', 'variation_option_id','click_collect','code_click_collect')
            ->withTimestamps();
    }

    /**
     * @return belongsTo
     */
    public function status(): belongsTo
    {
        return $this->belongsTo(OrderStatus::class, 'status');
    }

        /**
     * @return belongsTo
     */
    public function payment_info(): belongsTo
    {
        return $this->belongsTo(PaymentInfo::class, 'payment_info_id');
    }
    /**
     * @return belongsTo
     */
    public function coupon(): belongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id');
    }
    /**
     * @return belongsTo
     */
    public function shipping(): belongsTo
    {
        return $this->belongsTo(Shipping::class, 'shipping_class_id');
    }

    /**
     * @return belongsTo
     */
    public function customer(): belongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * @return BelongsTo
     */
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    /**
     * @return HasMany
     */
    public function children()
    {
        return $this->hasMany('App\Models\Order', 'parent_id', 'id');
    }

    /**
     * @return HasOne
     */
    public function parent_order()
    {
        return $this->hasOne('App\Models\Order', 'id', 'parent_id');
    }
}
