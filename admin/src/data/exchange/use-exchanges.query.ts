import { QueryParamsType, OrderQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Exchanges from "@repositories/exchange";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ExchangeQueryOptionsType } from "@ts-types/exchanges-type";

const fetchExchanges = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    status_id,
    shop_id,
    page = 1,
    limit = 20,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as OrderQueryOptionsType;
  const searchString = stringifySearchQuery({
    ref: text,
    status: status_id,
  });
  const url = `${API_ENDPOINTS.EXCHANGE}?search=${searchString}&shop_id=${shop_id}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Exchanges.all(url);
  return { exchanges: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useExchangesQuery = (
  params: ExchangeQueryOptionsType = {},
  options: any = {}
) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.EXCHANGE, params],
    fetchExchanges,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useExchangesQuery, fetchExchanges };
