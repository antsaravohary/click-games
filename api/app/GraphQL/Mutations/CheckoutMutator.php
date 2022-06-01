<?php


namespace App\GraphQL\Mutation;

use Illuminate\Support\Facades\Log;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Facades\Shop;

class CheckoutMutator
{

    public function verify($rootValue, array $args, GraphQLContext $context)
    {
        try {
            return Shop::call('App\Http\Controllers\CheckoutController@verify', $args);
        } catch (\Exception $e) {
            Log::info($e);
        }
        return false;
    }
}
