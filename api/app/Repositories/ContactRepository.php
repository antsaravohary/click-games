<?php

namespace App\Repositories;

use App\Http\Requests\CreateArticleRequest;
use App\Http\Requests\CreateContactRequest;
use App\Mail\ConditionUpdated;
use App\Mail\FirstContact;
use App\Models\Article;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class ContactRepository extends BaseRepository
{


    protected $fieldSearchable = [
        'email' => 'like',
        'first_contact'=>'like'
    ];
    protected $dataArray = ['email', 'name'];
    /**
     * Configure the Model
     **/
    public function model()
    {
        return Contact::class;
    }
    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function store(CreateContactRequest $request)
    {
        $data = $request->only($this->dataArray);
        $contact = $this->create($data);
        return $contact;
    }

    public function sendFirstEmail($id)
    {
        $contact = $this->findOrFail($id);
        $contact->first_contact = true;
        $contact->save();
        try {

            Mail::to($contact->email)->send(new FirstContact());
        } catch (\Exception $e) {
        }
        return $contact;
    }
}
