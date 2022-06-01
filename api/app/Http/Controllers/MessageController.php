<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Repositories\MessageRepository;
use Illuminate\Http\Request;

class MessageController extends Controller
{
private $repository;

    public function __construct(MessageRepository $repository){
        $this->repository=$repository;
    }

    public function store(MessageRequest $request){
        return $this->repository->storeMessage($request);
    }


}
