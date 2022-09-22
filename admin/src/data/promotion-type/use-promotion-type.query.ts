import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { PromotionType as TPromotionType } from "@ts-types/promotion-type.types";
import promotionType from "@repositories/promotion-type";

export const fetchPromotionTypes = async (id: string) => {
  const { data } = await promotionType.find(
    `${API_ENDPOINTS.PROMOTION_TYPE}/${id}`
  );
  return data;
};

export const usePromotionTypeQuery = (id: string) => {
  return useQuery<TPromotionType, Error>(
    [API_ENDPOINTS.PROMOTION_TYPE, id],
    () => fetchPromotionTypes(id)
  );
};
