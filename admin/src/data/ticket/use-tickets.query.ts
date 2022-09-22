import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Ticket from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { TicketPaginator } from "@ts-types/generated";

const fetchTIcket = async ({ queryKey }: QueryParamsType):Promise<{tickets:TicketPaginator}> => {
  const [_key, params] = queryKey;
  const {
    text,
    shop_id,
    page = 1,
    limit = 20,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    subject: text,
  });
  const url = `${API_ENDPOINTS.TICKET}?search=${searchString}&shop_id=${shop_id}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Ticket.all(url);
  return { tickets: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useTicketsQuery = (params: QueryOptionsType = {}) => {
  return useQuery<{tickets:TicketPaginator}, Error>([API_ENDPOINTS.TICKET, params], fetchTIcket, {

    keepPreviousData: true,
  });
};

export { useTicketsQuery, fetchTIcket };