<?php


namespace App\Repositories;

use App\Http\Requests\BrandCreateRequest;
use App\Http\Requests\BrandUpdateRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Game;
use App\Models\Purchase;
use App\Models\PurchaseProduct;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;



class PurchaseRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [];

    protected $dataArray = [
        "tracking_url",
        "tracking_number",
        "shipping_company",
        "sender_address_id"
        //"weight",
    ];


    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function store(Request $request)
    {
        $data = $request->only($this->dataArray);
        $data["status"] = "pending";
        $data["user_id"] = $request->user()->id;
        $purchase_products = $request["purchase_products"];
        $amount = 0;
        foreach ($purchase_products as $key => $purchase_product) {
            $amount += $purchase_product["total_price"];
        }
        $data["amount"] = $amount;
        $data["total"] =  $amount;
        $purchase = $this->create($data);
        $purchase_products;
        $purchase->ref = "VT" . $purchase->id . Carbon::createFromDate($purchase->created_at)->format("dmy");
        $purchase->products()->createMany($purchase_products);
        $purchase->save();
        return $purchase;
        //return ["data" => $data, "purchase_game" => $this->processGame($request["purchase_games"])];
    }

    public function processGame($purchase_games)
    {
        $games = [];
        $total_amount = 0;
        foreach ($purchase_games as $key => $pg) {
            $game = Game::findOrFail($pg['game']['id']);
            $price = $pg['game']['buy_price'];
            $games[] = [
                "game_id" => $pg['game']['id'],
                "price" => $price,
                "quantity" => $pg["quantity"],
                "total_price" => $price * $pg["quantity"],
                "status" => "pending"
            ];
            $total_amount += $price * $pg["quantity"];
        }
        return ["games" => $games, "total_amount" => $total_amount];
    }

    public function updatePurchase(Request $request,$id){
        $purchase=$this->find($id);
        $total=0;
        $purchase->products->saveMany($request['products']);
        foreach ($purchase->products as $key => $product) {
            $total=$product->total_price;
        }
        $purchase->total=$total;
        $purchase->amount=$total;
        $purchase->save();
    }

    public function model()
    {
        return Purchase::class;
    }
}
