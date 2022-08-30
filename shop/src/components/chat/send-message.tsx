import { PaperPlaneIcon } from "@components/icons/paper-plane";
import { useAddMessageMutation } from "@data/message/use-add-message-mutation";
import { useAddMessageToTicket } from "@data/ticket/use-ticket-mutation";
import { useForm } from "react-hook-form";
import { Input, TextArea } from "..";
type FormValue = {
  text: string;
};

export default function SendMessage({
  purchase_id,
  refChatContainer,
  ticket_id,
}:any) {
  const { mutate, isLoading } = useAddMessageMutation();
  const { register, handleSubmit, reset } = useForm<FormValue>();
  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutate(
          { purchase_id: purchase_id, ticket_id: ticket_id, text: values.text },
          {
            onSuccess: () => {
              reset();
            },
          }
        );
      })}
      className=" sticky bottom-0 flex-none border bg-white rounded-sm mt-2 flex justify-end p-4"
    >
      <TextArea
        disabled={isLoading}
        rows={1}
        className="w-full"
        {...register("text")}
      />
      <button disabled={isLoading} className="text-accent ml-2 " type="submit">
        <PaperPlaneIcon width={32} height={32} />
      </button>
    </form>
  );
}
