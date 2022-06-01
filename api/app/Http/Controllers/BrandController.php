<?php


namespace App\Http\Controllers;

use App\Entities\BrandRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use App\Exceptions\PickbazarException;
use App\Http\Requests\BrandCreateRequest;
use App\Http\Requests\BrandUpdateRequest;
use App\Http\Requests\CategoryCreateRequest;
use App\Repositories\BrandRepository as RepositoriesBrandRepository;
use Prettus\Validator\Exceptions\ValidatorException;


class BrandController extends CoreController
{
    public $repository;

    public function __construct(RepositoriesBrandRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Category[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(["modeles",'modeles.repair_prices'])->paginate($limit);
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
            return $this->repository->with(['modeles','modeles.repair_prices'])->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * @return JsonResponse
     */
    public function store(BrandCreateRequest $request)
    {

        return $this->repository->store($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param BrandUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(BrandUpdateRequest $request, $id)
    {

        return  $this->repository->updateBrand($request, $id);
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
