<?php


namespace App\GraphQL\Mutation;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Http\Controllers\OrderStatusController;
use App\Facades\Shop;

class OrderStatusMutator
{

    public function store($rootValue, array $args, GraphQLContext $context)
    {

        // Do graphql stuff
        return Shop::call('App\Http\Controllers\OrderStatusController@store', $args);
    }
}
