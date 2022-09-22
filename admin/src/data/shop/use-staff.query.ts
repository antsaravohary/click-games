
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { User as TUser } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import user from "@repositories/user";

export const fetchStaff = async (slug: string) => {
  const { data } = await user.find(`${API_ENDPOINTS.STAFFS}/${slug}`);
  return { staff: data };
};

type IProps = {
  staff: TUser;
};
export const useStaffQuery = (
  slug: string,
  options?: UseQueryOptions<IProps, Error, IProps, QueryKey>
) => {
  return useQuery<IProps, Error>(
    [API_ENDPOINTS.STAFFS, slug],
    () => fetchStaff(slug),
    options
  );
};
