import { Message } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { TicketService, TicketType } from "./ticket.service";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: TicketType) => TicketService.createTicket(input),
    {
      onSuccess: () => {
        
        toast.success("Votre ticket est envoyé");

      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TICKET);
      },
    }
  );
};
type AddMessageToTicketType={
  ticket_id:string;
  message:Message
}
export const useAddMessageToTicket=()=>{
  return useMutation(
    (input:AddMessageToTicketType)=>TicketService.addMessageToTicket(input)
  )
}
