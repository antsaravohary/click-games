<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Client\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmRetraitClickCollect extends Mailable
{
    use Queueable, SerializesModels;

    private $order;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $products = [];
        $address=$this->order->shop->address;
        $address=$address['street_address'].', '.$address['zip'].' '.$address['city'].' '.$address['state'];
        $telephone=$this->order->shop->settings['contact'];
        foreach ($this->order->products as $key => $product) {
            if ($product->pivot->click_collect) {
                $products[] = $product;
            }
        }
        return $this->markdown('emails.confirm-retrait-click-collect', ['to' => $this->to, 'ref' => $this->order->ref, 'products' => $products,'code_retrait'=>$this->order->code_click_collect,'address'=>$address,'telephone'=>$telephone])->subject(" Click Univers - Confirmation de retrait Click&Collect");
    }
}
