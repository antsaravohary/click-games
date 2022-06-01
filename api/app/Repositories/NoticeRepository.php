<?php

namespace App\Repositories;

use App\Http\Requests\NoticeRequest;
use App\Http\Requests\TicketRequest;
use App\Mail\NewAvis;
use App\Models\Notice;
use App\Models\Order;
use App\Models\Ticket;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\TicketRepositoryRepository;
use App\Validators\TicketRepositoryValidator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class TicketRepositoryRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class NoticeRepository extends BaseRepository
{


    /**
     * @var array
     */
    protected $fieldSearchable = [
        'product_id' => 'like',
    ];


    /**
     * @var array
     */
    protected $dataArray = [
        'star',
        'pseudo',
        'comment',
        'product_id',
    ];



    /**
     * Specify Model class name
     *
     * @return string
     */

    public function model()
    {
        return Notice::class;
    }


    public function store(NoticeRequest $request)
    {
        $data = $request->only($this->dataArray);
        $data['customer_id'] = $request->user()->id;
        $user = $request->user();
        if ($user->pseudo == null) {
            $user->pseudo = $data['pseudo'];
            $user->save();
        }

        $notice = $this->create($data);
        try {
            Mail::to($notice->customer->email)->send(new NewAvis($notice->start));
        } catch (\Exception $e) {
        }
        return $notice;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
