<?php


namespace App\GraphQL\Queries;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Facades\Shop;

class UserQuery
{
    public function fetchStaff($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@fetchStaff', $args);
    }
    public function me($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@me', $args);
    }
}
