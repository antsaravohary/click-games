<?php

namespace App\Repositories;

use App\Http\Requests\RepairRequest;
use App\Models\Delivery;
use App\Models\Repair;
use App\Models\RepairItem;
use App\Models\RepairPrice;
use App\Models\Transaction;
use Carbon\Carbon;
use Prettus\Repository\Criteria\RequestCriteria;

/**
 * Interface RepairRepository.
 *
 * @package namespace App\Repositories;
 */
class TransactionRepository extends BaseRepository
{


    protected $dataArray = [
        "user_id",
        "model_brand_id"
        //"weight",
    ];

    protected $fieldSearchable = [
        'user.name'=>'like',
        'object'=>'like',
        'user_id',
        'type'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Transaction::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
