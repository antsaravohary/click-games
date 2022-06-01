<?php

namespace App\Http\Controllers;

use App\Models\StripeSession;
use App\Repositories\StripeSessionRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StripeSessionController extends Controller
{
    private $repository;

    public function __construct(StripeSessionRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|StripeSession[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 10;
        return $this->repository->with(['user'])->where("status",0)->where("updated_at","<=",Carbon::now()->subHours(2))->paginate($limit);
    }
}
