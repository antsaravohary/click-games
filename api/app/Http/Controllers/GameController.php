<?php

namespace App\Http\Controllers;

use App\Http\Requests\GameCreateRequest;
use App\Repositories\GameRepository;
use Illuminate\Http\Request;

class GameController extends Controller
{
    private $repository;

    public function __construct(GameRepository $repository)
    {
     $this->repository=$repository;   
    }

    /**
     *  @param GameCreateRequest $request
     */
    public function store(GameCreateRequest $request){
        return $this->repository->store($request);
    }

    /**
     * 
     */
    public function index(){
        return $this->repository->paginate();
    }
}
