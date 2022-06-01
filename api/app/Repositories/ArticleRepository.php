<?php

namespace App\Repositories;

use App\Http\Requests\CreateArticleRequest;
use App\Mail\ConditionUpdated;
use App\Models\Article;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class ArticleRepository extends BaseRepository
{


    protected $fieldSearchable = [
        'title' => 'like',
        'type'
    ];
    protected $dataArray = ['title', 'slug', 'type'];
    /**
     * Configure the Model
     **/
    public function model()
    {
        return Article::class;
    }
    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function store(CreateArticleRequest $request)
    {
        $data = $request->only($this->dataArray);
        $items = $request->items;
        $article = $this->create($data);
        $article->items()->createMany($items);
        return $article;
    }

    public function updateArticle(CreateArticleRequest $request, $id)
    {
        $article = $this->findOrFail($id);
        $data = $request->only($this->dataArray);
        $article->update($data);
        $request['items'];

        foreach ($article->items as $key => $existant_item) {
            $in = false;
            foreach ($request['items'] as $key_request_item => $request_item) {
                if (isset($request_item['id'])) {
                    if ($existant_item->id == $request_item['id']) {
                        $in = true;
                        break;
                    }
                }
            }
            if (!$in) {
                $existant_item->delete();
            }
        }
        $article->refresh();

        foreach ($request['items'] as $key => $items) {
            if (isset($items['id'])) {
                $article->items()->where('id', $items['id'])->update($items);
            } else {
                $article->items()->create($items);
            }
        }
        $users = User::where('is_active', 1)->get();
        if ($request["notif"]) {
            foreach ($users as $user) {
                try {
                    Mail::to($user->email)->send(new ConditionUpdated);
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }
        }

        return $article;
    }
}
