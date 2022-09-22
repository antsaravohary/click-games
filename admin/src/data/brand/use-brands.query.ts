import { QueryParamsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { TagPaginator } from "@ts-types/generated";
import { BrandPaginator, BrandsQueryOptionsType } from "@ts-types/brand-type";
import Brand from "@repositories/brand";

const fetchBrands = async ({
  queryKey,
}: QueryParamsType): Promise<{ brands: BrandPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    category_id,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as BrandsQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
    category_id: category_id,
    type,
  });
  const url = `${API_ENDPOINTS.BRAND}?search=${searchString};type:${type}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Brand.all(url);
  return {
    brands: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useBrandsQuery = (options: BrandsQueryOptionsType) => {
  return useQuery<{ brands: BrandPaginator }, Error>(
    [API_ENDPOINTS.BRAND, options],
    fetchBrands,
    {
      keepPreviousData: true,
    }
  );
};

export { useBrandsQuery, fetchBrands };
