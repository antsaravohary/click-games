<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class OutilMagicController extends Controller
{
    public function removeBackground(Request $request, $id)
    {

        $attachement = Attachment::findOrFail($id);
        $client = new Client();

        $res = $client->post('https://pixcut.wondershare.com/openapi/api/v1/matting/removebg', [
            'multipart' => [
                [
                    'name'     => 'content',
                    'contents' => fopen($attachement->getMedia()[0]->getPath(), 'r')
                ]
            ],
            'headers' => [
                'appkey' => '65d24dc30cf4f2c48621eb1ba1e3141d'
            ]
        ]);
        $name ="temp/". Str::uuid()->toString().".png";
        //return $res->getBody();
        $file = Storage::path('public/'.$name);
        $fp = fopen($file, "wb");
        fwrite($fp, $res->getBody());
        fclose($fp);
        $url = Storage::url(
            $name, now()->addMinutes(5)
        );
        return URL::to('/').$url;
       /* $attachment2 = new Attachment;
        $attachment2->save();
        $attachment2->addMedia($file)->toMediaCollection();
        return $attachment2->getMedia();*/
    }
}
