<?php


namespace App\GraphQL\Mutation;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Facades\Shop;

class WithdrawMutation
{
    public function store($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\WithdrawController@store', $args);
    }
    public function approveWithdraw($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\WithdrawController@approveWithdraw', $args);
    }
}
