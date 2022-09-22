import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import promotion from "@repositories/promotion";
import { UpdatePromotionType } from "@ts-types/promotion-type.types";

export interface IPromotionTypeUpdateVariables {
  variables: {
    id: string;
    input: UpdatePromotionType;
  };
}

export const useUpdatePromotionTypeMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IPromotionTypeUpdateVariables) =>
      promotion.update(`${API_ENDPOINTS.PROMOTION_TYPE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PROMOTION_TYPE);
      },
    }
  );
};
