import { QueryParamsType, TagsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { RefundPaginator, RefundsQueryOptionsType } from "@ts-types/refund-type";
import refund from "@repositories/refund";

const fetchRefunds = async ({
  queryKey,
}: QueryParamsType): Promise<{ refunds: RefundPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    shop_id,
    status,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as RefundsQueryOptionsType;

  const searchString = stringifySearchQuery({
    title: text,
    status,
    type,
  });
  const url = `${API_ENDPOINTS.REFUND}?search=${searchString}&shopId=${shop_id}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await refund.all(url);
  return {
    refunds: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useRefundsQuery = (options: RefundsQueryOptionsType) => {
  return useQuery<{ refunds: RefundPaginator }, Error>(
    [API_ENDPOINTS.REFUND, options],
    fetchRefunds,
    {
      keepPreviousData: true,
    }
  );
};

export { useRefundsQuery, fetchRefunds };
