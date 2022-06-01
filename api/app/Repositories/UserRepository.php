<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Prettus\Validator\Exceptions\ValidatorException;
use Spatie\Permission\Models\Permission;
use App\Enums\Permission as UserPermission;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use App\Mail\ForgetPassword;
use Illuminate\Support\Facades\Mail;
use App\Models\Address;
use App\Models\Profile;
use App\Models\Shop;
use App\Exceptions\PickbazarException;
use App\Mail\CustomerRegistered;
use App\Mail\ShopOwnerRegistered;
use App\Models\Balance;
use Illuminate\Support\Facades\DB;

class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name' => 'like',
        'email' => 'like',
    ];

    /**
     * @var array
     */
    protected $dataArray = [
        'name',
        'last_name',
        'first_name',
        'email',
        'siret',
        'shop_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return User::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeUser($request)
    {
        try {
            $user = $this->create([
                'name'     => $request->first_name.' '.$request->last_name,
                'first_name'=>$request->first_name,
                'last_name'=>$request->last_name,
                'email'    => $request->email,
                'siret'=>isset($request->siret)?$request->siret:null,
                'password' => Hash::make($request->password),
            ]);
            $user->givePermissionTo(UserPermission::CUSTOMER);
            if (isset($request['address']) && count($request['address'])) {
                $user->address()->createMany($request['address']);
            }
            if (isset($request['profile'])) {
                $user->profile()->create($request['profile']);
            }
            $user->profile = $user->profile;
            $user->address = $user->address;
            $user->shop = $user->shop;
            $user->managed_shop = $user->managed_shop;
            if ($user->hasPermission(UserPermission::STORE_OWNER)) {
                try {
                    Mail::to($user->email)->send(new ShopOwnerRegistered("cu", "https://click-univers.com"));
                } catch (\Exception $e) {
                }
            } else {
                try {
                    Mail::to($user->email)->send(new CustomerRegistered());
                } catch (\Exception $e) {
                }
            }
            return $user;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function updateUser($request, $user)
    {
        try {
            if (isset($request['address']) && count($request['address'])) {
                foreach ($request['address'] as $address) {
                    $address['title']=$address['first_name']." ".$address['last_name'];
                    if (isset($address['id'])) {
                        Address::findOrFail($address['id'])->update($address);
                    } else {
                        $address['customer_id'] = $user->id;
                     
                        Address::create($address);
                    }
                }
            }
            if (isset($request['profile'])) {
                if (isset($request['profile']['id'])) {
                    Profile::findOrFail($request['profile']['id'])->update($request['profile']);
                } else {
                    $profile = $request['profile'];
                    $profile['customer_id'] = $user->id;
                    Profile::create($profile);
                }
            }
            if(isset($request['payment_info'])){
              DB::table("balances")->where(["user_id"=>$user->id])->update([
                  "payment_info"=>$request['payment_info']
              ]);
            }
            $data=$request->only($this->dataArray);
            if(isset($data['first_name'])&&isset($data['last_name'])){
                $data['name']=$data['first_name'].' '.$data['last_name'];
            }
          
            $user->update($request->only($this->dataArray));
            $user->profile = $user->profile;
            $user->address = $user->address;
            $user->shop = $user->shop;
            $user->managed_shop = $user->managed_shop;
            return $user;
        } catch (ValidationException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function sendResetEmail($email, $token)
    {
        try {
            Mail::to($email)->send(new ForgetPassword($token));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
