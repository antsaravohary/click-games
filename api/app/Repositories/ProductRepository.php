<?php


namespace App\Repositories;

use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\Product;
use App\Enums\ProductType;
use App\Exceptions\PickbazarException;
use App\Models\ProductInformation;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use Prettus\Validator\Exceptions\ValidatorException;

class ProductRepository extends BaseRepository
{

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        'shop_id',
        'exchangeable',
        'user_id',
        'price'=>'between',
        'status',
        'sku',
        'type.slug',
        'categories.slug',
    ];

    protected $dataArray = [
        'ref',
        'is_used',
        'note_admin',
        'exchangeable',
        'release_date',
        'click_collect',
        'pre_order',
        'mode',
        'name',
        'product_condition',
        'price',
        'discount',
        'max_price',
        'min_price',
        'type_id',
        'brand_id',
        'modele_id',
        'product_type',
        'quantity',
        'unit',
        'description',
        'sku',
        'image',
        'gallery',
        'status',
        'height',
        'length',
        'width',
        'weight',
        'in_stock',
        'is_taxable',
        'shop_id',
        'user_id'
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Product::class;
    }

    public function storeProduct($request)
    {

        try {
            $data = $request->only($this->dataArray);
            if ($data['discount'] == null) {
                $data['discount'] = 0;
            }
            $data['sale_price'] = $data['price'] - $data['discount'];
            $product = $this->create($data);
            if (isset($request['categories'])) {
                $product->categories()->attach($request['categories']);
            }
            if (isset($request['tags'])) {
                $product->tags()->attach($request['tags']);
            }
            if (isset($request['variations'])) {
                $product->variations()->attach($request['variations']);
            }
            if (isset($request['variation_options'])) {
                $variation_options = $request['variation_options']['upsert'];
                foreach ($variation_options as $key => $v) {
                    if ($v['discount'] == null) {
                        $v['discount'] = 0;
                    }
                    $variation_options[$key]['sale_price'] = $v['price'] - $v['discount'];
                }
                $product->variation_options()->createMany($variation_options);
            }
            if (isset($request['product_information'])) {
                $product->information()->associate(ProductInformation::create($request['product_information']));
                $product->save();
            }
            $product->categories = $product->categories;
            $product->variation_options = $product->variation_options;
            $product->variations = $product->variations;
            $product->information = $product->information;
            $product->type = $product->type;
            $product->tags = $product->tags;
            return $product;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function updateProduct($request, $id)
    {

        try {
            $product = $this->findOrFail($id);
            if (isset($request['categories'])) {
                $product->categories()->sync($request['categories']);
            }
            if (isset($request['tags'])) {
                $product->tags()->sync($request['tags']);
            }
            if (isset($request['variations'])) {
                $product->variations()->sync($request['variations']);
            }
            if (isset($request['variation_options'])) {
                if (isset($request['variation_options']['upsert'])) {

                    foreach ($request['variation_options']['upsert'] as $key => $variation) {
                        $variation['sale_price'] = $variation['price'] - $variation['discount'];
                        if (isset($variation['id'])) {

                            $product->variation_options()->where('id', $variation['id'])->update($variation);
                        } else {
                            $product->variation_options()->create($variation);
                        }
                    }
                }
                if (isset($request['variation_options']['delete'])) {
                    foreach ($request['variation_options']['delete'] as $key => $id) {
                        try {
                            $product->variation_options()->where('id', $id)->delete();
                        } catch (Exception $e) {
                        }
                    }
                }
            }
            $data = $request->only($this->dataArray);
            $data['sale_price'] = $data['price'] - $data['discount'];
            $product->update($data);
            if ($product->product_type === ProductType::SIMPLE) {
                $product->variations()->delete();
                $product->variation_options()->delete();
            }
            $product->categories = $product->categories;
            $product->variation_options = $product->variation_options;
            $product->variations = $product->variations;

            $product->type = $product->type;
            $product->tags = $product->tags;
            return $product;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function fetchRelated($slug, $limit = 10)
    {
        try {
            $product = $this->findOneByFieldOrFail('slug', $slug);
            $categories = $product->categories->pluck('id');
            $products = $this->whereHas('categories', function ($query) use ($categories) {
                $query->whereIn('categories.id', $categories);
            })->with('type')->limit($limit);
            return $products;
        } catch (Exception $e) {
            return [];
        }
    }
}
