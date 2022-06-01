<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Client\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewRefund extends Mailable
{
    use Queueable, SerializesModels;

    private $ref;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($ref)
    {
        $this->ref = $ref;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.new-refund', ['to' => $this->to, 'ref' => $this->ref])->subject("Click Games - Remboursement en cours");
    }
}
