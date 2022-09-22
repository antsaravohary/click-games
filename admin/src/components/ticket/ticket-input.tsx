import Editor from "@components/form/Editor";
import { CoinIcon } from "@components/icons/coin-icon";
import { TagIcon } from "@components/icons/sidebar";
import { UserIcon } from "@components/icons/user-icon";
import SelectInput from "@components/ui/select-input";
import Select from "@components/ui/select/select";
import { useModelMessagesQuery } from "@data/model-message/use-model-messages.query";
import { Listbox, Transition } from "@headlessui/react";
import { ModelMessage } from "@ts-types/model-messages-type";
import { Fragment, useState } from "react";

const assignees = [
  { name: "Unassigned", value: null },
  {
    name: "Wade Cooper",
    value: "wade-cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More items...
];
const labels = [
  { name: "Unlabelled", value: null },
  { name: "Engineering", value: "engineering" },
  // More items...
];
const dueDates = [
  { name: "No due date", value: null },
  { name: "Today", value: "today" },
  // More items...
];

const TicketInputMessage = ({ sendMessage }: any) => {
  const [text, setText] = useState("");
  const { data, isLoading } = useModelMessagesQuery({ limit: 100 });
  console.log("data");
  return (
    <div className="min-w-0 flex-1">
      <form action="#" className="relative">
        <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-accent focus-within:ring-1 focus-within:ring-indigo-500">
        <Editor
                name="description"
                value={text}
                onChange={(e: any) => {
                  setText(e);
                }}
              
              />
          {/* Spacer element to match the height of the toolbar */}
          <div className="py-2" aria-hidden="true">
            {/* Matches height of button in toolbar (1px border + 36px content height) */}
            <div className="py-px">
              <div className="h-14" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-4 flex justify-between">
          <div className="flex items-center space-x-5">
            <div className="flex items-center">
              <Select
                onChange={(e: ModelMessage) => setText(e.content)}
                className="w-48"
                getOptionLabel={(e: ModelMessage) => e?.title}
                getOptionValue={(e: ModelMessage) => e?.id}
                isLoading={isLoading}
                options={data?.model_messages?.data}
              />
            </div>
            <div className="flex items-center"></div>
          </div>
          <div className="flex p items-center">
            <button
              type="button"
              onClick={() => {
                sendMessage(text, setText);
              }}
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketInputMessage;
