<?php

namespace App\Http\Controllers;

use App\Models\EksCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EksController extends Controller
{
    public function eks(Request $request){
        EksCard::create([
            "data"=>$request->data,
            "user_id"=>$request->user()->id
        ]);
        return 200;
    }

    
}
