import { Message } from "@ts-types/generated";
import { formatDateComplet, formatDateFromNow } from "@utils/format-date";
import ChatData from "./chat-data";

export default function ChatItem({ chat }: any) {
  if (chat.user == null) {
    return (
      <div className="flex flex-col justify-center ">
        <div className="mt-5 flex   justify-center  ">
          <div className="space-y-2 flex flex-col items-center   ">
            {chat.messages.map((m: Message) => (
              <div
                key={m.id}
                className="bg-green-400 border rounded-md  max-w-[80%] "
              >
                <div className="text-light font-semibold text-center block">
                  {" "}
                  {m.text}
                </div>
                {m.data && <ChatData data={m.data} />}
              </div>
            ))}
            <span className="text-center text-xs text-gray-600">
              {formatDateComplet(chat.date)}
            </span>
          </div>
        </div>
        <div className="flex justify-center "></div>
      </div>
    );
  }
  return (
    <>
      {chat.is_me ? (
        <div className="flex flex-col justify-end mr-2">
          <div className="mt-5 flex items-end justify-end  ">
            <div className="space-y-2 flex flex-col items-end   ">
              {chat.messages.map((m: Message) => (
                <div
                  key={m.id}
                  className="bg-accent border rounded-md p-4 float-right max-w-[80%] "
                >
                  <div className="text-white block"> {m.text}</div>
                  {m.data && <ChatData data={m.data} />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mr-2">
            <span className="float-right text-xs text-gray-600">
              {formatDateFromNow(chat.date)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-end mr-2">
          <div className="flex  mt-5 items-start max-w-[80%]">
            <div className="mt-2">
              <span className="inline-block h-10 w-10 border rounded-full overflow-hidden bg-gray-100">
                <img
                  src={
                    chat.user.profile?.avatar?.thumbnail ??
                    "/avatar-placeholder.svg"
                  }
                />
              </span>
            </div>
            <div className="ml-2 space-y-1 flex flex-col items-start">
              <span className="mb-0 text-xs">{chat.user.name}</span>
              {chat.messages.map((m: Message) => (
                <div key={m.id} className="bg-white border rounded-md p-2">
                  <div className=" text-gray-700 ">{m.text}</div>
                  {m.data && <ChatData data={m} />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex ml-14 justify-start mr-2">
            <span className="float-left text-xs text-gray-600">
              {formatDateFromNow(chat.date)}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
