import { Message } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";
import { MessageService } from "./ticket.service";

type inputType = {
  ticket_id?: string;
  purchase_id?: string;
  text: string;
};
export const useAddMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((input: inputType) => MessageService.create(input), {
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ticket);
    },
  });
};
