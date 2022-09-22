import Product from "@repositories/product";
import { useQuery } from "react-query";
import { Ticket as Tticket } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";


export const fetchTicket = async (id: string) => {
  const { data } = await Product.find(`${API_ENDPOINTS.TICKET}/${id}`);
  return data;
};

export const useTicketQuery = (id: string) => {
  return useQuery<Tticket, Error>([API_ENDPOINTS.TICKET, id], () =>
    fetchTicket(id)
  );
};
