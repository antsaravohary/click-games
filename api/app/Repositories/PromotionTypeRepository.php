<?php

namespace App\Repositories;

use App\Models\PromotionType;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class PromotionTypeRepository extends BaseRepository
{
    /**
     * Configure the Model
     **/
    public function model()
    {

        return PromotionType::class;
    }
    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }
}
