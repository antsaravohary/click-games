<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModelMessageCreateRequest;
use App\Models\ModelMessage;
use App\Repositories\ModelMessageRepository;
use Illuminate\Http\Request;

class ModelMessageController extends Controller
{
    private $repository;

    public function __construct(ModelMessageRepository $repository)
    {
        $this->repository = $repository;
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|ModelMessage[]
     */
    public function index()
    {
        return $this->repository->paginate();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param OrderCreateRequest $request
     * @return LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function store(ModelMessageCreateRequest $request)
    {
        return $this->repository->create([
            "title" => $request["title"],
            "content" => $request["content"]
        ]);
    }

    public function show($id)
    {
        return $this->repository->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        return $this->repository->update([
            "title" => $request["title"],
            "content" => $request["content"]
        ], $id);
    }
}
