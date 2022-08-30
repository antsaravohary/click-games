import { BrandType, QueryParamsType } from "@ts-types/custom.types";
import { CoreApi, ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const brandService = new CoreApi(API_ENDPOINTS.BRAND);

export const fetchBrand = async ({queryKey}:QueryParamsType) => {
  const [_key, params] = queryKey;
  const { data } = await brandService.find(params as ParamsType);

  return data;
};

export const useBrandQuery = (options) => {
  return useQuery<BrandType[], Error>([API_ENDPOINTS.BRAND,options], fetchBrand);
};
