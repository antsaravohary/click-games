<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Mail\Contact;
use App\Enums\Permission;
use App\Mail\ContactAdmin;
use App\Mail\FirstContact;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Mail\CustomerRegistered;
use App\Mail\ShopOwnerRegistered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Exceptions\PickbazarException;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\Balance;
use App\Models\Permission as ModelsPermission;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UserController extends CoreController
{
    public $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['profile', 'address'])->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *Í
     * @param UserCreateRequest $request
     * @return bool[]
     */
    public function store(UserCreateRequest $request)
    {
        return $this->repository->storeUser($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return array
     */
    public function show($id)
    {
        try {
            $user = $this->repository->with(['profile', 'address', 'shop', 'subscription', 'managed_shop'])->findOrFail($id);
            return $user;
        } catch (Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(UserUpdateRequest $request, $id)
    {
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
            $user = $this->repository->findOrFail($id);
            return $this->repository->updateUser($request, $user);
        } elseif ($request->user()->id == $id) {
            $user = $request->user();
            return $this->repository->updateUser($request, $user);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    public function me(Request $request)
    {
        $user = $request->user();

        if (isset($user)) {
            $me = $this->repository->with(['profile', 'address', 'shops.balance', 'balance', 'subscription', 'managed_shop.balance', 'managed_shops'])->find($user->id);
            if ($me->balance == null) {
                $balance = Balance::create(['admin_commission_rate' => 1, 'user_id' => $me->id]);
                $me->balance = $balance;
            }
            return $me;
        }
        return [];
    }

    public function token(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->where('is_active', true)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return ["token" => null, "permissions" => []];
        }

        return ["token" => $user->createToken('auth_token')->plainTextToken, "permissions" => $user->getPermissionNames()];
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return true;
        }
        return $request->user()->currentAccessToken()->delete();
    }

    public function register(UserCreateRequest $request)
    {
        $permissions = [Permission::CUSTOMER];
        if (isset($request->permission)) {
            $permissions[] = isset($request->permission->value) ? $request->permission->value : $request->permission;
        }
        $user = $this->repository->create([
            'name'     => $request->first_name . ' ' . $request->last_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Balance::create(['admin_commission_rate' => 1, 'user_id' => $user->id]);
        $user->givePermissionTo($permissions);
        if (isset($request->permission)) {
            try {

                Mail::to($request->email)->send(new ShopOwnerRegistered("", ""));
            } catch (\Exception $e) {
            }
        } else {
            try {

                Mail::to($request->email)->send(new CustomerRegistered());
            } catch (\Exception $e) {
            }
        }

        return ["token" => $user->createToken('auth_token')->plainTextToken, "permissions" => $user->getPermissionNames()];
    }

    public function banUser(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && $user->id != $request->id) {
            $banUser =  User::find($request->id);
            $banUser->is_active = false;
            $banUser->save();
            return $banUser;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }
    public function activeUser(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && $user->id != $request->id) {
            $activeUser =  User::find($request->id);
            $activeUser->is_active = true;
            $activeUser->save();
            return $activeUser;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }
    public function checkPassword(Request $request)
    {
        $user = $request->user();
        if (Hash::check($request['password'], $user->password)) {
            return [true];
        } else {
            return [false];
        }
    }

    public function forgetPassword(Request $request)
    {
        $user = $this->repository->findByField('email', $request->email);
        if (count($user) < 1) {
            return ['message' => 'PICKBAZAR_MESSAGE.EMAIL.NOT_FOUND', 'success' => false];
        }
        $tokenData = DB::table('password_resets')
            ->where('email', $request->email)->first();
        if (!$tokenData) {
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => Str::random(16),
                'created_at' => Carbon::now()
            ]);
            $tokenData = DB::table('password_resets')
                ->where('email', $request->email)->first();
        }

        if ($this->repository->sendResetEmail($request->email, $tokenData->token)) {
            return ['message' => 'PICKBAZAR_MESSAGE.CHECK_INBOX_FOR_PASSWORD_RESET_EMAIL', 'success' => true];
        } else {
            return ['message' => 'PICKBAZAR_MESSAGE.SOMETHING_WENT_WRONG', 'success' => false];
        }
    }
    public function verifyForgetPasswordToken(Request $request)
    {
        $tokenData = DB::table('password_resets')->where('token', $request->token)->where('email', $request->email)->first();
        $user = $this->repository->findByField('email', $request->email);
        if (!$tokenData) {
            return ['message' => 'PICKBAZAR_MESSAGE.INVALID_TOKEN', 'success' => false];
        }
        $user = $this->repository->findByField('email', $request->email);
        if (count($user) < 1) {
            return ['message' => 'PICKBAZAR_MESSAGE.NOT_FOUND', 'success' => false];
        }
        return ['message' => 'PICKBAZAR_MESSAGE.TOKEN_IS_VALID', 'success' => true];
    }
    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required|string',
                'email' => 'email|required',
                'token' => 'required|string'
            ]);

            $user = $this->repository->where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            DB::table('password_resets')->where('email', $user->email)->delete();

            return ['message' => 'PICKBAZAR_MESSAGE.PASSWORD_RESET_SUCCESSFUL', 'success' => true];
        } catch (\Exception $th) {
            return ['message' => 'PICKBAZAR_MESSAGE.SOMETHING_WENT_WRONG', 'success' => false];
        }
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $user = $request->user();
            if (Hash::check($request->oldPassword, $user->password)) {
                $user->password = Hash::make($request->newPassword);
                $user->save();
                return ['message' => 'PICKBAZAR_MESSAGE.PASSWORD_RESET_SUCCESSFUL', 'success' => true];
            } else {
                return ['message' => 'PICKBAZAR_MESSAGE.OLD_PASSWORD_INCORRECT', 'success' => false];
            }
        } catch (\Exception $th) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }
    public function contactAdmin(Request $request)
    {
        try {
            $details = $request->only('subject', 'name', 'email', 'description');
            DB::table('contacts')->insert([
                'email' => $details['email'],
                'name' => $details['name']
            ]);
            Mail::to(config('shop.admin_email'))->send(new ContactAdmin($details));
            Mail::to($request->email)->send(new Contact($request['email']));
            return ['message' => 'Votre message est envoyé avec succès', 'success' => true];
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function fetchStaff(Request $request)
    {


        if (!isset($request->shop_id)) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
        if ($this->repository->hasPermission($request->user(), $request->shop_id)) {

            $staff = $this->repository->with(['profile', 'managed_shops'])->where('employer_id', 'like', $request->user()->id);
            return $staff;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function staffs(Request $request)
    {
        $query = $this->fetchStaff($request);
        $limit = $request->limit ?? 15;
        return $query->paginate($limit);
    }

    public function socialLogin(Request $request)
    {
        $provider = $request->provider;
        $token = $request->access_token;
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }
        $user = $request->user;
        /*try {
            $user = Socialite::driver($provider)->userFromToken($token);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.INVALID_CREDENTIALS');
        }*/
        $userCreated = User::firstOrCreate(
            [
                'email' => $user['email']
            ],
            [
                'email_verified_at' => now(),
                'name' => $user["name"],
                'first_name' => $user["first_name"],
                'last_name' => $user["last_name"],
                ''
            ]
        );
        /*  $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_user_id' => $user->getId(),
            ]
        );*/

        $avatar = [
            'thumbnail' => $user['image'],
            'original' =>  $user['image'],
        ];

        $userCreated->profile()->updateOrCreate(
            [
                'avatar' => $avatar
            ]
        );

        if (!$userCreated->hasPermissionTo(Permission::CUSTOMER)) {
            $userCreated->givePermissionTo(Permission::CUSTOMER);
        }

        return ["token" => $userCreated->createToken('auth_token')->plainTextToken, "permissions" => $userCreated->getPermissionNames()];
    }

    public function showStaff(Request $request, $id)
    {
        return $this->repository->with(['managed_shops'])->find($id);
    }
    public function editStaff(Request $request, $id)
    {
        $user = User::find($id);
        if (!$request->password == "**********") {
            $user->password = Hash::make($request->password);
        }
        $user->name = $request->first_name . " " . $request->last_name;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $staff_shop = [];
        if (isset($request->shops)) {

            foreach ($request->shops as $key => $idShop) {

                // $sp = DB::table('staff_shop')->where('shop_id', 'like', $id)->where('user_id', 'like', $user->id)->where('owner_id', 'like', $request->user()->id)->first();
                // if (!$sp) {
                $staff_shop[$key] = [
                    'shop_id' => $idShop,
                    'user_id' => $user->id,
                    'owner_id' => $request->user()->id,
                ];
                /* } else {
                    $staff_shop[$key] = $sp;
                }*/
            }
            // $user->managed_shops()->sync([$staff_shop[0]->id=>$staff_shop]);
            // return $staff_shop;
        }
        $user->managed_shops()->detach($user->managed_shops);
        $user->managed_shops()->sync($staff_shop);
        $user->save();


        return $this->repository->with(['managed_shops'])->find($id);
    }


    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['facebook', 'google'])) {
            throw new PickbazarException('PICKBAZAR_ERROR.PLEASE_LOGIN_USING_FACEBOOK_OR_GOOGLE');
        }
    }
}
