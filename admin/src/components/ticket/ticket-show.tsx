import Image from "next/image";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Truncate from "@components/ui/truncate-scroll";
import Button from "@components/ui/button";
import { useTicketQuery } from "@data/ticket/use-ticket.query";
import { useCreateMessageMutation } from "@data/message/use-ticket-create.mutation";
import { Message, User } from "@ts-types/generated";
import { useMeQuery } from "@data/user/use-me.query";
import { useUpdateTicketMutation } from "@data/ticket/use-ticket-update.mutation";
import TicketInputMessage from "./ticket-input";

type TIcketProps = {
  id: string;
  isMobile: boolean;
  go_back: any;
};
type MessageProps = {
  message: Message;
  user: User;
  is_shop:boolean;
};

const MessageItem = ({ message, user,is_shop }: MessageProps) => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  return (
    <div className="chat-message">
      {" "}
      <div className="flex items-start w-full">
        <div className="flex flex-col space-y-2 text-xs mx-2 order-2 items-start w-full">
          <div className="px-4  rounded-lg w-full flex flex-col  rounded-bl-none w-full ">
            <div className="flex justify-between w-full">
              <span className="font-bold mb-2">  {is_shop?`[Support Click Univers]`:message?.user?.name}</span>
              <span className="text-gray-600">
                {" "}
                {dayjs(message.created_at).fromNow()}
              </span>
            </div>

            <div dangerouslySetInnerHTML={{__html:message.text}}></div>
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
  if (user.id != message.user?.id) {
    return (
      <div className="chat-message">
        <div className="flex items-start w-full">
          <div className="flex flex-col space-y-2 text-xs mx-2 order-2 items-start w-full">
            <div className="px-4  rounded-lg w-full flex flex-col  rounded-bl-none w-full ">
              <div className="flex justify-between w-full">
                <span className="font-bold mb-2">{user.name}</span>
                <span className="text-gray-600">
                  {" "}
                  {dayjs(message.created_at).fromNow()}
                </span>
              </div>

              {message.text}
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
  } = useTicketQuery(id);
  const { data: meData, isLoading: loadingMe } = useMeQuery();
  const userId = meData?.id;
  console.log("userData", meData);
  const ticket = data;
  const { mutate: addMessage } = useCreateMessageMutation();
  const { mutate: updateTicket, isLoading: updating } =
    useUpdateTicketMutation();
  const handleAddMessage = (text: string, setText: (e) => {}) => {
    if (ticket?.id) {
      addMessage(
        {
          variables: {
            input: {
              ticket_id: ticket.id,
              text: text,
            },
          },
        },
        {
          onSuccess() {
            setText("");
            refetch();
          },
        }
      );
    }
  };
  return (
    <div className="w-full p:2 sm:p-6 justify-start flex flex-col h-full ">
      <div className="flex justify-between ">
        {ticket?.status ? (
          <Button
            className="item-end text-red-400 hover:bg-red-600"
            loading={updating}
            onClick={() => {
              if (ticket) {
                updateTicket({
                  variables: {
                    id: ticket?.id as string,
                    input: { status: false },
                  },
                });
              }
            }}
            variant="outline"
          >
            Clôturer le litige
          </Button>
        ) : (
          <div className=" p-2 rounded  text-red-600">Litige fermé</div>
        )}
        <Button className="item-end" onClick={go_back} variant="outline">
          Fermer
        </Button>
      </div>

      <div className="flex items-center justify-between border-b-2 border-gray-200 bg-white my-2 p-4 rounded">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{ticket?.subject}</span>
              <span className="text-green-500"> </span>
            </div>
            <span className="text-sm text-gray-600">
              <Truncate character={60} buttonText="plus">
                {ticket?.description ?? ""}
              </Truncate>
            </span>
          </div>
        </div>
        {/** 
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          */}
      </div>

      <div
        id="messages"
        className="flex flex-col space-y-10 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {ticket?.messages?.map((message) => (
          <MessageItem user={meData as User} message={message as Message} is_shop={ticket?.customer_id!==message?.user?.id} />
        ))}
      </div>

      {ticket?.status ? (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <TicketInputMessage sendMessage={handleAddMessage} />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="bg-red-600 w-full mx-8 p-2 text-white rounded text-center">
            LITIGE FERMER
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketShow;
