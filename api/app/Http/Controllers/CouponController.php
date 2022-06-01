<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\NewPromotion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use App\Http\Requests\CouponRequest;
use Illuminate\Support\Facades\Mail;
use App\Exceptions\PickbazarException;
use App\Repositories\CouponRepository;
use App\Http\Requests\UpdateCouponRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CouponController extends CoreController
{
    public $repository;

    public function __construct(CouponRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Collection|Type[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CouponRequest $request
     * @return LengthAwarePaginator|Collection|mixed
     * @throws ValidatorException
     */
    public function store(CouponRequest $request)
    {
        $validateData = $request->validated();
        $coupon = $this->repository->create($validateData);
        $users = User::where('is_active', 1)->get();
        foreach ($users as $user) {
            try {
                Mail::to($user->email)->send(new NewPromotion($coupon));
            } catch (\Exception $e) {
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            return $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }
    /**
     * Verify Coupon by code.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function verify(Request $request)
    {
        $request->validate([
            'code'     => 'required|string',
        ]);
        $code = $request->code;
        try {
            return $this->repository->verifyCoupon($code);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CouponRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateCouponRequest $request, $id)
    {
        try {
            $this->repository->findOrFail($id);
            return $this->repository->update($request->validated(), $id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }
}
