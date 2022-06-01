<?php

namespace App\Repositories;

use App\Http\Requests\TicketRequest;
use App\Mail\NewTicket;
use App\Models\Order;
use App\Models\Ticket;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\TicketRepositoryRepository;
use App\Validators\TicketRepositoryValidator;
use Illuminate\Support\Facades\Mail;

/**
 * Class TicketRepositoryRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class TicketRepository extends BaseRepository 
{
        /**
     * @var array
     */
    protected $dataArray = [
        'subject',
        'description',
    ];



    /**
     * Specify Model class name
     *
     * @return string
     */
     
    public function model()
    {
        return Ticket::class;
    }


    public function store(TicketRequest $request){
        $data=$request->only($this->dataArray);
        $data['customer_id']=$request->user()->id;
        $data['priority']=3;
        $data['status']=true;
        if(isset($request['order_id'])){
            $data["order_id"]=$request["order_id"];
            $order= Order::find($request['order_id']);
            $data['shop_id']=$order['shop_id'];
            $data['priority']=1;
        }
        $ticket=$this->create($data);
        try {
            Mail::to($ticket->customer->email)->send(new NewTicket());
        } catch (\Exception $e) {

        }
        return $ticket;
        

    }
    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}
