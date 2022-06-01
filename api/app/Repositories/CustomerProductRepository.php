<?php

namespace App\Repositories;

use App\Models\CustomerProduct;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Validators\CustomerProductValidator;

/**
 * Class CustomerProductRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class CustomerProductRepository extends BaseRepository 
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return CustomerProduct::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}
