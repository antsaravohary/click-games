<?php

namespace App\Repositories;

use App\Http\Requests\CreateFaqRequest;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Models\Faq;
use App\Validators\FaqValidator;

/**
 * 
 *
 * @package namespace App\Repositories;
 */
class FaqRepository extends BaseRepository
{

    protected $dataArray = [
        'subject',
        'content'
    ];

    protected $fieldSearchable = [
        'subject'=>'like'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Faq::class;
    }

    public function store(CreateFaqRequest $request)
    {
        $data = $request->only($this->dataArray);
        $data['user_id'] = 1;
        $data['status'] = true;
        return $this->create($data);
    }
    public function updateFaq(CreateFaqRequest $request, $id)
    {
        $faq = $this->findOrFail($id);
        $data = $request->only($this->dataArray);
        $faq->update($data);
        return $faq;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
