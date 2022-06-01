import { QueryParamsType } from "@ts-types/custom.types";
import { Ticket } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
import { TicketService } from "./ticket.service";

type PaginatedTicket = {
  data: Ticket[];
  paginatorInfo: any;
};

export const fetchTicket = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedTicket> => {
    let {data,...rest}  = await TicketService.fetchTicket();
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

export const useTicketsQuery = (
  params?: any,
  options?: UseInfiniteQueryOptions<
    PaginatedTicket,
    Error,
    PaginatedTicket,
    PaginatedTicket,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedTicket, Error>(
    [API_ENDPOINTS.TICKET, params],
    fetchTicket,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};
