<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Repositories\ProductRepository;
use App\Models\Product;
use App\Exceptions\PickbazarException;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;

class ProductController extends CoreController
{
    public $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Product[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();
        if ($user != null && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER) || $user->hasPermissionTo(Permission::STAFF))) {
            return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
        } else {
            return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->where('status', '=', 'publish')->paginate($limit);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductCreateRequest $request
     * @return mixed
     */
    public function store(ProductCreateRequest $request)
    {
        if (isset($request->shop_id)) {
            if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
                return $this->repository->storeProduct($request);
            } else {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
            }
        } else if (isset($request->user_id)) {
            //store product from particular
            return $this->repository->storeProduct($request);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $slug
     * @return JsonResponse
     */
    public function show($slug, Request $request)
    {
        if (is_numeric($slug)) {
            return $this->repository->find($slug);
        }
        try {
            $limit = isset($request->limit) ? $request->limit : 10;
            $product = $this->repository
                ->with(['type', 'shop', 'brand', 'modele', 'categories', 'tags', 'variations.attribute.values', 'variation_options', 'user', 'user.profile', 'information'])
                ->findOneByFieldOrFail('slug', $slug);
            $product->related_products = $this->repository->fetchRelated($slug, $limit);
            $product->count = count($this->repository->all());
            return $product;
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(ProductUpdateRequest $request, $id)
    {
        $request->id = $id;
        return $this->updateProduct($request);
    }

    public function updateProduct(Request $request)
    {
        $product = Product::findOrFail($request->id);
        if ($this->repository->hasPermission($request->user(), $product->shop_id) || $request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
            $id = $request->id;
            return $this->repository->updateProduct($request, $id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
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

    public  function generateSKU()
    {
        $count = count($this->repository->all());
        return ["sku" => "CU000" . ($count + 1)];
    }

    public function relatedProducts(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        return $this->repository->fetchRelated($request->slug, $limit);
    }
}
