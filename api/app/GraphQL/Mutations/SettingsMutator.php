<?php


namespace App\GraphQL\Mutation;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Facades\Shop;

class SettingsMutator
{
    public function update($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\SettingsController@store', $args);
    }
}
