<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Http\Client\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewPromotion extends Mailable
{
    use Queueable, SerializesModels;

    private $coupon;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($coupon)
    {
        $this->coupon = $coupon;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.new-promotion', ['to' => $this->to, 'ref' => $this->coupon->code,'expire_date'=>(new Carbon($this->coupon->expire_at))->format('d/m/y')])->subject("Click Games - Promotion");
    }
}
