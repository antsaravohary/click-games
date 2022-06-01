<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Models\User;
use App\Repositories\SubscriptionRepository;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    private $repository;
    public function __construct(SubscriptionRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user != null && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF))) {
            return $this->repository->with(['user'])->has("user")->paginate($limit);
        }
    }
     /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) {
            return [];
        }
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $this->repository->with(["user"])->findOneWhere(['id' => $id]);
        } else {
        }
    }
}
