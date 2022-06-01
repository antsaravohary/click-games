<?php


namespace App\Repositories;

use App\Http\Requests\MessageRequest;
use App\Models\Coupon;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class MessageRepository extends BaseRepository
{

    /**
     * @var array
     */
    protected $fieldSearchable = [];
    protected $dataArray = [
        'text',
        'ticket_id',
        'purchase_id',
        'type',
        'data'
    ];

    public function storeMessage(MessageRequest $request)
    {
        $user = $request->user();
        $message = $request->only($this->dataArray);
        $message['user_id'] = $user->id;
        $message= $this->create($message);
        if($message->type==="PPP"){
            DB::table("messages")->where("user_id","=",$user->id)->where("purchase_id","=",$message->purchase_id)->where("type","=","PPP")->update(["data_is_avalaible"=>false]);
            $message->data_is_avalaible=true;
            $message->save();
        }
        return $message;
    }


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
        return Message::class;
    }
}
