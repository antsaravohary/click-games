<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Repair extends Model
{
    public $guarded = [];

    /**
     * @return BelongsTo
     */
    public function model_brand(): BelongsTo
    {
        return $this->belongsTo(ModelBrand::class, "model_brand_id");
    }
    /**
     * @return BelongsTo
     */
    public function payment_info(): BelongsTo
    {
        return $this->belongsTo(PaymentInfo::class, 'payment_info_id');
    }

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
     * @return belongsToMany
     */
    public function items(): BelongsToMany
    {
        return $this->belongsToMany(RepairPrice::class, "repair_item")
            ->withPivot('id', 'price', 'total_price', 'status')
            ->withTimestamps();
    }
}
