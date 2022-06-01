<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShopOwnerRegistered extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    private $name;
    private $url_validation;
    

    public function __construct($name,$url_validation)
    {
        $this->name=$name;
        $this->$url_validation=$url_validation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.shop-owner-registered',['name'=>$this->name,'url_validation'=>$this->url_validation,'to'=>$this->to])->subject("Click Univers - 3,2,1 Vendez !");
    }
}
