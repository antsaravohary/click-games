<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Address;
use App\Models\Product;
use Illuminate\Console\Command;
use MOIREI\GoogleMerchantApi\Facades\ProductApi;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'click-games:add_product_google {start} {end}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $attributes = Product::skip($this->argument("start"))->take($this->argument("end"))->get();

        foreach ($attributes as $key => $p) {
            echo "\n";
            echo $key . " - ";
            
            
            ProductApi::merchant([
                'app_name' => 'click games',
                'merchant_id' => '628792250',
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
            })->then(function ($data) use ($p) {
                echo 'Product inserted [' . $p->id . '] =>' . $p->name;
            })->otherwise(function () use ($p) {
                echo 'Insert failed' . $p->name;;
            })->catch(function ($e) {
                dump($e);
            });
        }

        // return    storage_path('app/google-merchant-api/service-account-credentials.json');



        return Command::SUCCESS;
    }
}
