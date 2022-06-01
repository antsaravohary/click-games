<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeRequest;
use App\Repositories\NoticeRepository;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;
use Prettus\Validator\Exceptions\ValidatorException;

class NoticeController extends Controller
{
    private $repository;
    public function __construct(NoticeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function show($id)
    {
        return $this->repository->find($id);
    }
    /**
     * 
     *
     * @param NoticeRequest $request
     * @return LengthAwarePaginator|Collection|mixed
     * @throws ValidatorException
     */
    public function store(NoticeRequest $noticeRequest){
      return $this->repository->store($noticeRequest);
    

    }

    public function index(Request $request){
        $user=$request->user();
        $limit = $request->limit ?   $request->limit : 15;
        if(isset($request['userId'])&&$request['userId']=="me"){
            return $this->repository->with(['customer'])->where('customer_id','like',$user->id)->paginate($limit);
        }
        return $this->repository->with(['customer','customer.profile'])->paginate($limit);

    }
}
