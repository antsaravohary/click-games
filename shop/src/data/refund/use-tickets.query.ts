import { QueryParamsType } from "@ts-types/custom.types";
import { Refund } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
import { RefundService } from "./refund.service";

type PaginatedRefund = {
  data: Refund[];
  paginatorInfo: any;
};

export const fetchRefund = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedRefund> => {
    let {data,...rest}  = await RefundService.fetchTicket();
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

export const useRefundsQuery = (
  params?: any,
  options?: UseInfiniteQueryOptions<
    PaginatedRefund,
    Error,
    PaginatedRefund,
    PaginatedRefund,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedRefund, Error>(
    [API_ENDPOINTS.REFUND, params],
    fetchRefund,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};
