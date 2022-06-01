import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Orders from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import promotion from "@repositories/promotion";

const fetchPromotion = async ({ queryKey }: QueryParamsType) => {
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
    tracking_number: text,
  });
  const url = `${API_ENDPOINTS.PROMOTION}?search=${searchString}&shop_id=${shop_id}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await promotion.all(url);
  return { promotions: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const usePromotionsQuery = (params: QueryOptionsType = {}, options: any = {}) => {
  return useQuery<any, Error>([API_ENDPOINTS.PROMOTION, params], fetchPromotion, {
    ...options,
    keepPreviousData: true,
  });
};

export { usePromotionsQuery, fetchPromotion };
