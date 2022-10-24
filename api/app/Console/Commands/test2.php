<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Address;
use App\Models\Product;
use App\Models\ProductAds;
use Illuminate\Console\Command;
use MOIREI\GoogleMerchantApi\Facades\ProductApi;

class Test2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'click-games:test {start} {end}';

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

        $attributes = Product::all();

        foreach ($attributes as $key => $p) {
           /* $ps=ProductAds::create([
                "google_merchant_state"=>"success",
                "google_merchant_at"=>Carbon::now(),
                "google_merchant_need_update"=>false
            ]);
            $p->product_ads_id=$ps->id;
            $p->save();*/
            $price=$p->price+10;
            $p->price=$price;
            $p->sale_price=$price;
            $p->save();
        }

        // return    storage_path('app/google-merchant-api/service-account-credentials.json');



        return Command::SUCCESS;
    }
}
