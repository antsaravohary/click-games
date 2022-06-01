<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use App\Http\Requests\TicketRequest;
use App\Mail\FeedBackTicket;
use App\Models\Message;
use App\Models\Ticket;
use App\Repositories\TicketRepository;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;
use Prettus\Validator\Exceptions\ValidatorException;

class TicketController extends CoreController
{
    private $repository;

    public function __construct(TicketRepository $ticketRepository)
    {
        $this->repository = $ticketRepository;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TicketRequest $request
     * @return LengthAwarePaginator|Collection|mixed
     * @throws ValidatorException
     */
    public function store(TicketRequest $request)
    {
        return $this->repository->store($request);
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        $user = $request->user();
        if ($user->hasPermissionTo(Permission::STORE_OWNER)) {
            if (isset($request['status'])) {
                $ticket->status = $request['status'];
                $ticket->save();
            }
        }
        if (isset($request['message'])) {
            $message = $request['message'];
            $message['user_id'] = $request->user()->id;
            $message['ticket_id'] = $id;
            if ($user->hasPermissionTo(Permission::STORE_OWNER)) {
                try {
                    Mail::to($ticket->customer->email)->send(new FeedBackTicket($ticket->id));
                } catch (\Exception $e) {
                }
            }

            return Message::create($message);
        }
        return $ticket;
    }


    public function show($id)
    {
        return $this->repository->with(["messages","customer", "messages.user", "messages.user.profile"])->find($id);
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Ticket[]
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $this->repository->paginate(100);
        } else  if ($user && $user->hasPermissionTo(Permission::STORE_OWNER)) {
            return $this->repository->where("shop_id", "like", $request->shop_id)->paginate(100);
        } elseif ($user && $user->hasPermissionTo(Permission::STAFF)) {
            return $this->repository->where('shop_id', 'like', $request->shop_id)->paginate(100);
        } else {
            return $this->repository->where('customer_id','like',$user->id)->paginate(100);
        }
    }
}
