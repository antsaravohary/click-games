<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductAds;
use Carbon\Carbon;
use Illuminate\Http\Request;
use MOIREI\GoogleMerchantApi\Facades\ProductApi;

class ProductAdsController extends Controller
{
    public function add_product_to_google_merchant($id)
    {
        $p = Product::find($id);
        $productAds = $p->productAds;
        if (!$productAds) {
            $productAds = ProductAds::create([]);
        }
        ProductApi::merchant([
            'app_name' => 'click games',
            'merchant_id' => '565781391',
            'client_credentials_path' => storage_path('app/google-merchant-api/service-account-credentials.json')
        ])->insert(function ($product) use ($p) {

            $product->with($p)
                ->link((env("SHOP_URL") . '/products/' . $p->slug))
                ->imageLink($p->image["original"])
                ->description(substr(strip_tags($p->description), 0, 4000))
                // ->brand($attributes->categories[0]->name)
                ->availability("in stock")
                ->identifierExists(false)
                ->price($p->sale_price, 'EUR');
        })->then(function ($data) use ($productAds) {
            $productAds->google_merchant_state = "success";
            $productAds->google_merchant_at = Carbon::now();
            $productAds->google_merchant_need_update = false;
        })->otherwise(function () use ($productAds) {
            $productAds->google_merchant_state = "failed";
            $productAds->google_merchant_need_update = true;
        })->catch(function ($productAds) {
            $productAds->google_merchant_state = "failed";
            $productAds->google_merchant_need_update = true;
        });
        $productAds->save();
        $p->product_ads_id = $productAds->id;
        $p->save();
        return 200;
    }
}
