import Tag from "@repositories/tag";
import { useQuery } from "react-query";
import { Brand as TBrand } from "@ts-types/brand-type";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchBrand = async (id: string) => {
  const { data } = await Tag.find(`${API_ENDPOINTS.BRAND}/${id}`);
  return { brand: data };
};

type IProps = {
  brand: TBrand;
};

export const useBrandQuery = (id: string) => {
  return useQuery<IProps, Error>([API_ENDPOINTS.BRAND, id], () => fetchBrand(id));
};
