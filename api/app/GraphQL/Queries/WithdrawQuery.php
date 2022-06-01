<?php


namespace App\GraphQL\Queries;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Facades\Shop;

class WithdrawQuery
{
    public function fetchWithdraws($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\WithdrawController@fetchWithdraws', $args);
    }

    public function fetchSingleWithdraw($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\WithdrawController@fetchSingleWithdraw', $args);
    }
}
