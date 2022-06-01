<?php

namespace App\Console;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use App\Enums\Permission as UserPermission;
use Illuminate\Support\Facades\Validator;




class Schedcule extends Command
{
    protected $signature = 'click-univers:schedcule';

    protected $description = 'schedcule';
    public function handle()
    {
        echo "Hello world";
    }
}
