<?php


namespace App\Enums;

use BenSampo\Enum\Enum;


final class ShippingType extends Enum
{
    public const FIXED = 'fixed';
    public const PERCENTAGE = 'percentage';
    public const FREE = 'free_shipping';
    public const
        DEFAULT = 'fixed';
}
