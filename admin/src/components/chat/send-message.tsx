import { PaperPlaneIcon } from "@components/icons/paper-plane";
import TextArea from "@components/ui/text-area";
import { useCreateMessageMutation } from "@data/message/use-create-message.mutation";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
type FormValue = {
  text: string;
};

export default function SendMessage({ purchase_id, refChatContainer }) {
  const { mutate, isLoading } = useCreateMessageMutation();
  const { register, handleSubmit, reset } = useForm<FormValue>();
  const queryClient=useQueryClient();
  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutate(
          {
            variables: {
              input: {
                purchase_id: purchase_id,
                text: values.text,
              },
            },
          },
          {
            onSuccess: () => {
              reset();
            },
            onSettled:()=>{
              console.log("invalide",API_ENDPOINTS.PURCHASE)
              queryClient.invalidateQueries([API_ENDPOINTS.PURCHASE,purchase_id])
            }
          }
        );
      })}
      className=" sticky bottom-0 flex-none border bg-white rounded-sm mt-2 flex justify-end p-4"
    >
      <TextArea
        disabled={isLoading}
        rows={5}
        className="w-full"
        {...register("text")}
      />
      <button disabled={isLoading} className="text-accent ml-2 " type="submit">
        <PaperPlaneIcon width={32} height={32} />
      </button>
    </form>
  );
}
