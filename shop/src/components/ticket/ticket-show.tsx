import Image from "next/image";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useAddMessageToTicket } from "@data/ticket/use-ticket-mutation";
import { useTicketQuery } from "@data/ticket/use-ticket.query";
import { Message, User } from "@ts-types/generated";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Truncate from "@components/ui/truncate-scroll";
import Button from "@components/ui/button";
import Chat from "@components/chat/chat";
import SendMessage from "@components/chat/send-message";
type TIcketProps = {
  id?: string|undefined;
  isMobile: boolean;
  go_back: any;
};
type MessageProps = {
  message: Message;
  user: User;
  is_shop: boolean;
};

const MessageItem = ({ message, user, is_shop }: MessageProps) => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  return (
    <div className="chat-message">
      {" "}
      <div className="flex items-start w-full">
        <div className="flex flex-col space-y-2 text-xs mx-2 order-2 items-start w-full">
          <div className="px-4  rounded-lg w-full flex flex-col  rounded-bl-none w-full ">
            <div className="flex justify-between w-full">
              <span className="font-bold mb-2">
                {is_shop ? `[Support Click Univers]` : message?.user?.name}</span>
              <span className="text-gray-600">
                {" "}
                {dayjs(message.created_at).fromNow()}
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: message.text }}></div>

          </div>
        </div>

        <Image
          className="relative cursor-pointer w-1 h-1 overflow-hidden rounded border border-border-100 pt-4"
          src={
            message?.user?.profile?.avatar?.thumbnail ??
            "/avatar-placeholder.svg"
          }
          width="40px"
          height="40px"
          alt={message?.user?.name}
          objectFit="contain"
          loading="eager"
        />
      </div>
    </div>
  );
  if (user.id !== message.user?.id) {
    return (
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <div className="px-4 py-2 rounded-lg flex flex-col inline-block rounded-bl-none bg-white ">
                <span className="font-bold mb-2">{user.name}</span>
                <span className="text-gray-600"></span>
                {message.text}
              </div>
            </div>
          </div>
          <Image
            className="relative cursor-pointer w-1 h-1 overflow-hidden rounded-full border border-border-100"
            src={
              message?.user?.profile?.avatar?.thumbnail ??
              "/avatar-placeholder.svg"
            }
            width="40px"
            height="40px"
            alt={message?.user?.name}
            objectFit="contain"
            loading="eager"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat-message">
        <div className="flex items-start justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                {message.text}
              </span>
            </div>
            <span className="text-sm text-gray-400">
              {dayjs(message.created_at).fromNow()}
            </span>
          </div>
          <Image
            className="relative cursor-pointer w-1 h-1 overflow-hidden rounded-full border border-border-100"
            width="40px"
            height="40px"
            src={
              message?.user?.profile?.avatar?.thumbnail ??
              "/avatar-placeholder.svg"
            }
            alt={message?.user?.name}
            objectFit="contain"
            loading="eager"
          />
        </div>
      </div>
    );
  }
};

const TicketShow = ({ id, isMobile, go_back }: TIcketProps) => {
  const {
    data,
    isFetching: fetchingTicket,

    refetch,
  } = useTicketQuery({ ref: id });
  const ticket = data?.ticket;
  const { isLoading: loading, data: me, error } = useCustomerQuery();


  const { mutate: addMessage } = useAddMessageToTicket();
  const [text, setText] = useState<string>("");
  const handleAddMessage = () => {
    if (ticket?.id) {
      addMessage(
        {
          ticket_id: ticket.id,
          message: {
            text: text,
          },
        },
        {
          onSuccess() {
            refetch();
            setText("");
          },
        }
      );
    }
  };
  console.log("ticket", ticket);
  return (
    <div className="w-full p:2 sm:p-6 justify-start flex flex-col h-full">
      <h3 className="text-leading font-bold">{ticket?.subject}</h3>
      <div className="border mt-2 p-4">
        <p>{ticket?.description}</p>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-10 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {!loading && ticket?.messages?.map((message) => (
          <MessageItem user={me?.me as User} message={message as Message} is_shop={ticket?.customer_id !== message?.user?.id} />
        ))}
      </div>
      <SendMessage ticket_id={ticket?.id} />
    </div>
  );
};

export default TicketShow;
