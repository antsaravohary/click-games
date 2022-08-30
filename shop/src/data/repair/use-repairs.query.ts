import {
  QueryParamsType,
  Order,
  OrdersQueryOptionsType,
} from "@ts-types/custom.types";
import {
  repair,
  repairPaginator,
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
import { RepairService } from "./repair.service";
type PaginatedOrder = {
  data: repair[];
  paginatorInfo: any;
};
const fetchRepairs = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedOrder> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await RepairService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await RepairService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useRepairsQuery = (
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
    [API_ENDPOINTS.REPAIR, params],
    fetchRepairs,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useRepairsQuery, fetchRepairs };
