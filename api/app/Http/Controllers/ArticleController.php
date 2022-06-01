<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Exceptions\PickbazarException;
use App\Http\Requests\CreateArticleRequest;
use App\Repositories\ArticleRepository;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    private $repository;

    public function __construct(ArticleRepository $repository)
    {
        $this->repository = $repository;
    }
    public function show($id, Request $request)
    {
        if (is_numeric($id)) {
            return $this->repository->with(['items'])->findOrFail($id);
        } else {
            return $this->repository->with(['items'])->findOneByFieldOrFail('slug', $id);
        }
    }
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['items'])->paginate($limit);
    }
    public function store(CreateArticleRequest $request)
    {

        return $this->repository->store($request);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param $id
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

    public function update(CreateArticleRequest $request, $id)
    {
        return $this->repository->updateArticle($request, $id);
    }
}
