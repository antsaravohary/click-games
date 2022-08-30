import { QueryParamsType } from "@ts-types/custom.types";
import { Purchase, PurchaseQueryOptionsType } from "@ts-types/purchases-type";
import { ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
import { PurchaseGameService } from "./purchase-game.service";
type PaginatedOrder = {
  data: Purchase[];
  paginatorInfo: any;
};
const fetchPurchases = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedOrder> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await PurchaseGameService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await PurchaseGameService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const usePurchasesQuery = (
  params?: PurchaseQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedOrder,
    Error,
    PaginatedOrder,
    PaginatedOrder,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedOrder, Error>(
    [API_ENDPOINTS.REPAIR, params],
    fetchPurchases,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { usePurchasesQuery, fetchPurchases };
