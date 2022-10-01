<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Repositories\CustomerProductRepository;
use Illuminate\Http\Request;

class CustomerProductController extends Controller
{
    public $repository;

    public function __construct(CustomerProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user != null && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF))) {
            return $this->repository->with(['customer_product', 'shop_product', 'customer_product.categories', 'shop_product.categories', 'user'])->paginate($limit);
        } else {

            return $this->repository->with(['product','product.categories'])->where('user_id', '=', $user->id)->where('status','=',1)->paginate($limit);
        }
    }
}
