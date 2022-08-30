import {
  QueryParamsType,
} from "@ts-types/custom.types";
import { Exchange } from "@ts-types/exchanges-type";
import {
  repairQueryOptionsType,
} from "@ts-types/repairs-type";
import { ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
import { ExchangeService } from "./exchange.service";
type PaginatedOrder = {
  data: Exchange[];
  paginatorInfo: any;
};
const fetchExchange = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedOrder> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await ExchangeService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await ExchangeService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useExchangesQuery = (
  params?: repairQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedOrder,
    Error,
    PaginatedOrder,
    PaginatedOrder,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedOrder, Error>(
    [API_ENDPOINTS.EXCHANGE, params],
    fetchExchange,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useExchangesQuery, fetchExchange };
