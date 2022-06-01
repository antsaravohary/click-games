<?php


namespace App\Repositories;

use App\Http\Requests\BrandCreateRequest;
use App\Http\Requests\BrandUpdateRequest;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;



class ModelRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [];

    protected $dataArray = [
    
    ];


    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

   
    public function model()
    {
       // return Brand::class;
    }
}
