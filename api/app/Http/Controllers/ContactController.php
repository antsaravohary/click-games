<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\PickbazarException;
use App\Repositories\ContactRepository;
use App\Http\Requests\CreateArticleRequest;
use App\Http\Requests\CreateContactRequest;

class ContactController extends Controller
{
    private $repository;

    public function __construct(ContactRepository $repository)
    {
        $this->repository = $repository;
    }
    public function show($id)
    {
        return $this->repository->findOrFail($id);
    }
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
    }
    public function store(CreateContactRequest $request)
    {

        return $this->repository->store($request);
    }
     /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    public function update(Request $request, $id)
    {
        if($request->action=="send_first_email"){
            return $this->repository->sendFirstEmail($id);
        }
       
    }
}
