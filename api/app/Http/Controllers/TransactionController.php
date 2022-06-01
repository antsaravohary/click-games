<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use Illuminate\Http\Request;
use App\Repositories\TransactionRepository;

class TransactionController extends Controller
{
    private $repository;

    public function __construct(TransactionRepository $transactionRepository)
    {
        $this->repository=$transactionRepository;
    }

    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF)) {
            return $this->repository->with(['user'])->paginate($limit);
        } else {

            return $this->repository->where('user_id','=',$request->user()->id)->paginate($limit);
        }
    }
}
