<?php

namespace App\Repositories;

use App\Models\StripeSession;

class StripeSessionRepository extends BaseRepository
{

    public function model()
    {
        return StripeSession::class;
    }

}
