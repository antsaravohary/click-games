@component('mail::message',['to'=>$details['name']])
# {{$details['subject']}}

Email: {{$details['email']}}

{{$details['description']}}

Merci,<br>
{{ $details['name'] }}
@endcomponent