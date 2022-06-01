import { QueryParamsType, OrderQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Purchases from "@repositories/repair";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { PurchaseQueryOptionsType } from "@ts-types/purchases-type";

const fetchPurchases = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    page = 1,
    limit = 20,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as PurchaseQueryOptionsType;
  const searchString = stringifySearchQuery({
    ref: text,
  });
  const url = `${API_ENDPOINTS.PURCHASE}?search=${searchString}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Purchases.all(url);
  return { purchases: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const usePurchasesQuery = (
  params: PurchaseQueryOptionsType = {},
  options: any = {}
) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.PURCHASE, params],
    fetchPurchases,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { usePurchasesQuery, fetchPurchases };
