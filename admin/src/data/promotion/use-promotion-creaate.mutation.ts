import { CreatePromotion } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import Promotion from "@repositories/promotion";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

export interface IOPromotionCreateVariables {
  variables: { input: CreatePromotion };
}

export const useCreatePromotionMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ({ variables: { input } }: IOPromotionCreateVariables) =>
      Promotion.create(`${API_ENDPOINTS.PROMOTION}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:update-success"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PROMOTION);
      },
    }
  );
};
