<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * 
     */
    public function info(Request $request)
    {
        $user = $request->user();

        $order_query = DB::table('orders')->where('customer_id', '=', $user->id)->where("parent_id","!=",null);
        $repair_query = DB::table('repairs')->where('user_id', '=', $user->id);
        $total_order = $order_query->count("id");
        $total_repair=$repair_query->count("id");

        return[
            "total_order"=>$total_order,
            "total_repair"=>$total_repair
        ];
    }
}
