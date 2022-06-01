<?php


namespace App\Repositories;

use App\Http\Requests\BrandCreateRequest;
use App\Http\Requests\BrandUpdateRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ModelBrand;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;



class BrandRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = ["category_id" => "like","type","name"=>"like"];

    protected $dataArray = [
        "name",
        "category_id",
        "type",
    ];


    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function store(BrandCreateRequest $request)
    {
        $brand = $this->create($request->only($this->dataArray));

        $modelesInput = $request->modeles;

        foreach ($modelesInput as $key => $model) {
            $modele = ModelBrand::create([
                "name" => $model['name'],
                "brand_id"=>$brand->id
            ]);
            $modele->repair_prices()->createMany($model['repair_prices']);
        }
       // $brand->modeles()->createMany($modeles);
        return $brand;
    }

    public function updateBrand(BrandUpdateRequest $request, $id)
    {
        $brand = $this->findOrFail($id);
        $modeles = $request->modeles;
        $brand->update($request->only($this->dataArray));
        $brand = $this->syncModel($brand->modeles, $modeles, $brand);
        return $brand;
    }


    public function syncModel($existModeles, $inputModeles, $brand)
    {
        foreach ($existModeles as $key => $existModel) {
            $delete = true;
            foreach ($inputModeles as $key2 => $inputModel) {
                if ($inputModel['id']!="" && $existModel->id == $inputModel['id']) {
                    $delete = false;
                    break;
                }
            }
            if ($delete) {
                DB::table("model_brand")->where("id", $existModel->id)->delete();
            }
        }
        foreach ($inputModeles as $key2 => $inputModel) {
            if ($inputModel['id']!="") {
                $model=ModelBrand::find($inputModel['id']);
                $model->name=$inputModel['name'];
                $exist_repair_prices=$model->repair_prices;
                foreach ($exist_repair_prices as $key => $exist_repair_price) {
                    $delete=true;
                   foreach ($inputModel['repair_prices'] as $key => $repair_price) {
                     if($repair_price['id']!=""&&$repair_price['id']==$exist_repair_price->id){
                         $delete=false;
                     }
                   }
                   if($delete){
                    DB::table("repair_prices")->where("id", $exist_repair_price->id)->delete();
                   }

                }
                foreach ($inputModel['repair_prices'] as $key => $repair_price) {
                    if($repair_price['id']!=""){
                        DB::table("repair_prices")->where('id',$repair_price['id'])->update(['name'=>$repair_price['name'],'price'=>$repair_price['price']]);
                    }else{
                        DB::table("repair_prices")->insert([
                            'name'=>$repair_price['name'],
                            'price'=>$repair_price['price'],
                            'model_brand_id'=>$model->id,
                        ]);
                    }


                }

            } else {
                $modele = ModelBrand::create([
                    "name" => $inputModel['name'],
                    "brand_id"=>$brand->id
                ]);
                $modele->repair_prices()->createMany($inputModel['repair_prices']);
              
            }
        }
        return $brand->refresh();
    }
    /**
     * Configure the Model
     **/
    public function model()
    {
        return Brand::class;
    }
}
