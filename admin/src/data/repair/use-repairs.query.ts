import { QueryParamsType,  OrderQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Repairs from "@repositories/repair";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { RepairQueryOptionsType } from "@ts-types/repairs-type";

const fetchRepairs = async ({ queryKey }: QueryParamsType) => {
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
    status:status_id
  });
  const url = `${API_ENDPOINTS.REPAIR}?search=${searchString}&shop_id=${shop_id}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Repairs.all(url);
  return { repairs: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useRepairsQuery = (params: RepairQueryOptionsType = {}, options: any = {}) => {
  return useQuery<any, Error>([API_ENDPOINTS.REPAIR, params], fetchRepairs, {
    ...options,
    keepPreviousData: true,
  });
};

export { useRepairsQuery, fetchRepairs };
