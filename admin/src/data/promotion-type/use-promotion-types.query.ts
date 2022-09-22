import {
  QueryParamsType,
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { PromotionTypePaginator, PromotionTypeQueryOptionsType } from "@ts-types/promotion-type.types";
import PromotionType from "@repositories/promotion-type";

const fetchPromotionTypes = async ({
  queryKey,
}: QueryParamsType): Promise<{ promotion_types: PromotionTypePaginator }> => {
  const [_key, params] = queryKey;

  const {
    title,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as PromotionTypeQueryOptionsType;

  const searchString = stringifySearchQuery({
    title: title,
  });
  const url = `${API_ENDPOINTS.PROMOTION_TYPE}?search=${searchString}&searchJoin=and&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await PromotionType.all(url);
  return {
    promotion_types: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const usePromotionTypesQuery = (options: PromotionTypeQueryOptionsType) => {
  return useQuery<{ promotion_types: PromotionTypePaginator }, Error>(
    [API_ENDPOINTS.PROMOTION_TYPE, options],
    fetchPromotionTypes,
    {
      keepPreviousData: true,
    }
  );
};

export { usePromotionTypesQuery, fetchPromotionTypes };
