import { Message, User } from "@ts-types/generated";
import { useEffect, useMemo, useRef } from "react";
import ChatItem from "./chat-item";
import SendMessage from "./send-message";
type propsInput = {
  messages: Message[];
  user: User;
  ticket_id?:string;
  purchase_id?:string;
  title?:string;
  description?:string;
};

export default function Chat({ messages, user, title="Messenger",description,ticket_id,purchase_id}: propsInput) {
  const ref = useRef(null);
  const messagesFilter = useMemo(() => {
    let messageGrouped: any = [];
    let currentMessage: Message;
    let currentIdx = 0;
    let next_message = false;

    messages?.forEach((m) => {
      if (
        currentMessage &&
        (currentMessage.user?.id != m.user?.id ||
          (new Date(m.updated_at).getTime() -
            new Date(currentMessage?.updated_at).getTime()) /
            1000 >
            60)
      ) {
        currentIdx += 1;
      }

      if (!messageGrouped[currentIdx]) {
        messageGrouped[currentIdx] = {
          user: {},
          is_me: false,
          date: null,
          messages: [],
        };
      }
      messageGrouped[currentIdx] = {
        user: m.user,
        is_me: m.user?.id === user.id,
        date: m.updated_at,
        messages: [...messageGrouped[currentIdx].messages, m],
      };
      currentMessage = m;
    });
    return messageGrouped;
  }, [messages]);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="h-[90vh] col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border md:p-6">
      <div className="intro-y box border bg-white dark:bg-dark-2 dark:border-dark-2 flex items-center px-5 py-4">
        <div className="flex items-center mr-auto">
          <div className="w-12 h-12 flex-none image-fit mr-1 hidden">
            <img className="rounded-full" src="dist/images/profile-9.jpg" />
            <div className="bg-green-500 w-3 h-3 absolute right-0 top-0 rounded-full border-2 border-white" />
          </div>
          <div className="ml-2">
           {title}
            <div className="text-gray-600 ">{description}</div>
          </div>
        </div>
        <a className="text-gray-600 hover:text-theme-1 hidden">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-camera w-4 h-4 sm:w-6 sm:h-6"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx={12} cy={13} r={4} />
          </svg>{" "}
        </a>
        <a className="text-gray-600 hover:text-theme-1 ml-2 sm:ml-5 hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-mic w-4 h-4 sm:w-6 sm:h-6"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1={12} y1={19} x2={12} y2={23} />
            <line x1={8} y1={23} x2={16} y2={23} />
          </svg>{" "}
        </a>
      </div>
      <div className="overflow-y-auto    pt-5 flex-1">
        {messagesFilter?.map((chat, idx) => {
          return <ChatItem chat={chat} />;
        })}
        <div ref={ref}></div>
      </div>
      <SendMessage purchase_id={purchase_id} ticket_id={ticket_id} refChatContainer={ref} />
    </div>
  );
}
