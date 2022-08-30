import { Order } from "@ts-types/custom.types";
import { Ticket } from "@ts-types/generated";
import { useQuery } from "react-query";
import { TicketService } from "./ticket.service";

export const fetchTicket = async (ticketId: string) => {
  const { data } = await TicketService.findOne(`${ticketId}`);
  return {
    ticket: data,
  };
};
export const useTicketQuery = ({
  ref,
}: {
  ref: string;
}) => {
  return useQuery<{ ticket: Ticket }, Error>(["ticket", ref], () =>
  fetchTicket(ref)
  );
};
