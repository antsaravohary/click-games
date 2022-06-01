<?php

namespace App\Repositories;

use App\Http\Requests\RepairRequest;
use App\Models\Delivery;
use App\Models\Repair;
use App\Models\RepairItem;
use App\Models\RepairPrice;
use Carbon\Carbon;
use Prettus\Repository\Criteria\RequestCriteria;

/**
 * Interface RepairRepository.
 *
 * @package namespace App\Repositories;
 */
class RepairRepository extends BaseRepository
{


    protected $dataArray = [
        "user_id",
        "model_brand_id"
        //"weight",
    ];

    protected $fieldSearchable = ["ref"=>"like"];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Repair::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function store(RepairRequest $request)
    {
        $data = $request->only($this->dataArray);
        $data['user_id'] = $request->user()->id;
        $processItem = $this->processItem($request['items']);
        $data["total_amount"] = $processItem["total_amount"];
        $data["amount"] = $processItem["total_amount"];
        $data["status"] = "pending";
        $delivery = Delivery::create([
            'sender_address_id' => $request['sender_address_id'],
            'company' => "",
            'receiver_address_id' => 1,
            'tracking_number' => "",
            'tracking_url' => "",
            'status' => "pending"
        ]);
        $data["send_delivery_id"]=$delivery->id;
        $repair = $this->create($data);
        $repair->ref="CR".$repair->id.Carbon::now()->format("dmy");
      
       $repair->items()->attach($processItem['items']);
       $repair->save();
       return $repair;
    }

    public function processItem($repair_items)
    {
        $items = [];
        $total_amount = 0;
        foreach ($repair_items as $key => $item) {
            $repair_price = RepairPrice::find($item['repair_price']['id']);
            $items[] = [
                "repair_price_id" => $repair_price->id,
                "price" => $repair_price->price,
                "total_price" => $repair_price->price,
                "status" => "pending",
            ];
            $total_amount += $repair_price->price;
        }
        return ["total_amount" => $total_amount, "items" => $items];
    }
}
