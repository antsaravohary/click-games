<?php

namespace App\Providers;

use App\Enums\CouponType;
use App\Enums\Permission;
use App\Enums\ProductType;
use App\Enums\ShippingType;
use App\Enums\WithdrawStatus;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Nuwave\Lighthouse\Schema\TypeRegistry;
use Nuwave\Lighthouse\Schema\Types\LaravelEnumType;

class AppServiceProvider extends ServiceProvider
{
    protected $enums = [
        CouponType::class,
        Permission::class,
        ShippingType::class,
        ProductType::class,
        WithdrawStatus::class,
    ];
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(TypeRegistry $typeRegistry)
    {
        $this->registerEnum($typeRegistry);
        $this->givePermissionToSuperAdmin();
    }

    public function registerEnum($typeRegistry)
    {
        foreach ($this->enums as $enum) {
            $typeRegistry->register(
                new LaravelEnumType($enum)
            );
        }
    }

    
    public function givePermissionToSuperAdmin()
    {
        Gate::before(function ($user, $ability) {
            return $user->hasPermissionTo(Permission::SUPER_ADMIN) ? true : null;
        });
    }

}
