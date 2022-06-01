<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Exceptions\PickbazarException;
use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Repositories\PromotionRepository;
use App\Http\Requests\PromotionCreateRequest;
use App\Http\Requests\PromotionUpdateRequest;
use Carbon\Carbon;
use Stripe\Issuing\Card;

class promotionController extends Controller
{

    private $repository;
    public function __construct(PromotionRepository $repository)
    {
        $this->repository=$repository;
    }
    
    public function store(PromotionCreateRequest $request){
        return $this->repository->store( $request);
    }

      /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Promotion[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 10;
     
        $promotions= $this->fetchPromotion($request);
     if($promotions!=null){

     $promotions=$promotions->paginate($limit)->withQueryString();}
     return $promotions;
    }
    public function fetchPromotion(Request $request)
    {
        $user = $request->user();
        

        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && (!isset($request->shop_id) || $request->shop_id === 'undefined')) {
            return $this->repository->with(['promotion_type','products']);

        } else if ($this->repository->hasPermission($user, $request->shop_id)) {

            
                
            return $this->repository->with(['promotion_type','products'])->where('shop_id', '=', $request->shop_id);

          
        }
    }


     /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        try {
            $promotion = $this->repository->with(['products','promotion_type'])->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $promotion;
        }/* elseif (isset($order->shop_id)) {
            if ($this->repository->hasPermission($user, $order->shop_id)) {
                return $order;
            }
        } elseif ($user->id === $order->customer_id) {
            return $order;
        } */else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

   public function update(Request $request,$id){
       if($request['action']==="promotion_valide"){
        $promotion=$this->repository->with('promotion_type')->findOrFail($id);
        $promotion->status="validated";
        $promotion->start_date=Carbon::now();
        $promotion->end_date=Carbon::now()->addDays($promotion->promotion_type->delay);
        $promotion->save();
        return $promotion;
       }

     
    
}
}
