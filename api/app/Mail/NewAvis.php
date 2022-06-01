<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Client\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewAvis extends Mailable
{
    use Queueable, SerializesModels;

    private $star;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($star)
    {
        $this->star = $star;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.new-avis', ['to' => $this->to, 'star' => $this->star])->subject("Click Games - Merci d'avoir donné votre avis");
    }
}
