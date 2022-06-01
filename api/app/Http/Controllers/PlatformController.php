<?php

namespace App\Http\Controllers;

use App\Repositories\PlatformRepository;
use Illuminate\Http\Request;

class PlatformController extends Controller
{
    private $repository;

    public function __construct(PlatformRepository $repository)
    {
        $this->repository=$repository;
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Product[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 30;
        return $this->repository->paginate($limit);
    }
}
