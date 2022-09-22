
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Promotion as TPromotion} from "@ts-types/promotion.type";
import promotion from "@repositories/promotion";

export const fetchPromotion = async (id: string) => {
  const { data } = await promotion.find(`${API_ENDPOINTS.PROMOTION}/${id}`);
  return { promotion: data };
};

type PromotionResponse = {
  promotion: TPromotion;
};

export const usePromotionQuery = (id: string) => {
  return useQuery<PromotionResponse, Error>([API_ENDPOINTS.PROMOTION, id], () =>
  fetchPromotion(id)
  );
};
