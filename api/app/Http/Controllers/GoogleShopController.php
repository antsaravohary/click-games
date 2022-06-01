<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use MOIREI\GoogleMerchantApi\Facades\ProductApi;

class GoogleShopController extends Controller
{
    //

    public function listProduct()
    {
        /*  $text = "id	title	description\tlink	image link	condition	availability	price	sale price\n";

        $products = Product::all();
        foreach ($products as $id => $product) {
            $text = $text . $product->sku . "\t";
            $text = $text .'"' . $product->name .'"' . "\t";
            $text = $text .'"'. strip_tags($product->description).'"' . "\t";
           // $text = $text . " " . "\t";
            //$text = $text . " " . "\t";
            $text = $text . env("APP_URL") . "/product//" . $product->slug . "\t";
            $text = $text . $product->image['thumbnail'] . "\t";
            $text = $text . "new" . "\t";
            $text = $text . "in stock" . "\t";
            $text = $text . $product->price . "EUR\t";
            $text = $text . $product->sale_price . "EUR\t";
            $text = $text . "\n";
        }
        $filename = 'test.txt';
        return response()->streamDownload(function () use ($text) {
            echo $text;
        }, $filename);*/

        $attributes = [
            'id' => 1, // maps to offerId (if set in config)
            'name' => 'Product 1', // likewise maps to title
        ];
        $attributes = Product::all()->first();

        // return    storage_path('app/google-merchant-api/service-account-credentials.json');
        ProductApi::merchant([
            'app_name' => 'click games',
            'merchant_id' => '565781391',
            'client_credentials_path' => storage_path('app/google-merchant-api/service-account-credentials.json')
        ])->insert(function ($product) use ($attributes) {
            $product->with($attributes)
                ->link((env("SHOP_URL") . '/product/' . $attributes->slug))
                ->imageLink($attributes->image["original"])
                ->description(substr(strip_tags($attributes->description), 0, 4000))
               // ->brand($attributes->categories[0]->name)
                ->availability("in stock")
                ->identifierExists(false)
                ->price($attributes->sale_price, 'EUR');
        })->then(function ($data) {
            echo 'Product inserted';
        })->otherwise(function () {
            echo 'Insert failed';
        })->catch(function ($e) {
            dump($e);
        });
    }
}
