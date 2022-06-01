<?php


namespace App\Repositories;

use App\Http\Requests\GameCreateRequest;
use App\Models\Game;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;



class GameRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        "name"=>"like",
        "platform_id"
    ];

    protected $dataArray = [
    "name",
    "description",
    "buy_price",
    "quantity",
    "year",
    "sale_price",
    "platform_id"
    ];


    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }
    public function store(GameCreateRequest $request){
        $data=$request->only($this->dataArray);
        $game=$this->create($data);
        return $game;

    }

   
    public function model()
    {
       return Game::class;
    }
}
