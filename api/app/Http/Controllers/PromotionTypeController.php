<?php

namespace App\Http\Controllers;

use App\Exceptions\PickbazarException;
use App\Http\Requests\PromotionCreateRequest;
use App\Http\Requests\PromotionTypeCreateRequest;
use App\Http\Requests\PromotionTypeUpdateRequest;
use App\Models\PromotionType;
use App\Repositories\PromotionTypeRepository;
use Illuminate\Http\Request;

class PromotionTypeController extends Controller
{
    //
    private $repository;
    
    public function __construct(PromotionTypeRepository $repository)
    {
        $this->repository=$repository;
    }

    public function store(PromotionTypeCreateRequest $request){
        $validatedData = $request->validated();
        
        return $this->repository->create($validatedData);
    }

        /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|PromotionType[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
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
     * Update the specified resource in storage.
     *
     * @param CategoryUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(PromotionTypeUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();
            return $this->repository->findOrFail($id)->update($validatedData);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }
}
