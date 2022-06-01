<?php


namespace App\Enums;

use BenSampo\Enum\Enum;


final class WithdrawStatus extends Enum
{
    public const APPROVED = 'approved';
    public const PENDING = 'pending';
    public const ON_HOLD = 'on_hold';
    public const REJECTED = 'rejected';
    public const PROCESSING = 'precessing';
}
