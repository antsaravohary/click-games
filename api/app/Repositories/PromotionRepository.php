<?php


namespace App\Repositories;

use App\Exceptions\PickbazarException;
use App\Http\Requests\PromotionCreateRequest;
use App\Models\Promotion;
use App\Models\PromotionType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class PromotionRepository extends BaseRepository
{

    protected $dataArray = [
        'promotion_type_id',
        'shop_id',
        'amount',
        'status',
        'total_amount',
        'delay',
    ];


    /**
     * Configure the Model
     **/
    public function model()
    {
        return Promotion::class;
    }
    public function store($data)
    {
        $products = $data['products'];
        $data=$data['promotionInput'];
        $data['status'] = "pending";
        $data['paid'] = true;
        $promotion = $this->create($data);
        
        $promotion->products()->attach($products);
    }


    public function preparePromotion(Request $request)
    {
        $data['promotionInput'] = $request->only($this->dataArray);
        $promotion_type = PromotionType::findOrFail($data['promotionInput']['promotion_type_id']);
        $data['products'] = $this->processProducts($request['products']);
        //verifié si le nombre de produit est correspondant au nombre de promotion type
        if ($promotion_type->max_product < count($data['products'])) {

            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
        $data['promotionInput']['amount'] = $promotion_type->price;
        $data['promotionInput']['factor'] = 1;
        $data['promotionInput']['total_amount'] = $data['promotionInput']['factor'] * $data['promotionInput']['delay'] * $promotion_type->price;
        $data['promotionInput']['status'] = "pending";

        return $data;
    }
    public function processProducts($products)
    {
        foreach ($products as $key => $product) {
            $products[$key] = [
                'product_id' => $product['id'],
                'status' => 'pending',
            ];
        }
        return $products;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }
}
