import { QueryParamsType } from "@ts-types/custom.types";
import { repair } from "@ts-types/repairs-type";
import { TransactionQueryOptionsType } from "@ts-types/transactions-type";
import { ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
import { TransactionService } from "./transaction.service";
type PaginatedOrder = {
  data: repair[];
  paginatorInfo: any;
};
const fetchTransactions = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedOrder> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {

    const response = await TransactionService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    console.log("parmas",queryKey);
    const response = await TransactionService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useTransactionsQuery = (
  params?: TransactionQueryOptionsType,
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
    fetchTransactions,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useTransactionsQuery, fetchTransactions };
