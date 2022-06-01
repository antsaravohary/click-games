import { Notice, NoticesQueryOptionsType, QueryParamsType } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";
import { NoticeService } from "./notice.service";





export const fetchNotice = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const response = await NoticeService.find(params as NoticesQueryOptionsType );
  return { notices: response.data };
};
export const useNoticesQuery = (options:NoticesQueryOptionsType) => {
  return useQuery<{ notices: { data: Notice[] } }, Error>(
    [API_ENDPOINTS.NOTICE,options],
    fetchNotice
  );
};