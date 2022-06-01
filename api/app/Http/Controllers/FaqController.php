<?php

namespace App\Http\Controllers;

use App\Exceptions\PickbazarException;
use App\Http\Requests\CreateFaqRequest;
use App\Repositories\FaqRepository;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public $repository;

    public function __construct(FaqRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Address[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
    }

    public function store(CreateFaqRequest $request)
    {
        return $this->repository->store($request);
    }
    public function show($id)
    {
        return $this->repository->findOrFail($id);
    }


    public function update(CreateFaqRequest $request, $id)
    {
        return $this->repository->updateFaq($request, $id);
    }
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }
}
