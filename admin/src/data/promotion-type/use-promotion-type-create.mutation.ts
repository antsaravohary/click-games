
import { ROUTES } from "@utils/routes";
import PromotionType from "@repositories/promotion-type";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { CreatePromotionType } from "@ts-types/promotion-type.types";

export interface IPromotionTypeCreateVariables {
  variables: { input: CreatePromotionType };
}

export const useCreatePromotionTypeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IPromotionTypeCreateVariables) =>
      PromotionType.create(API_ENDPOINTS.PROMOTION_TYPE, input),
    {
      onSuccess: () => {
        router.push(ROUTES.PROMOTION_TYPE);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PROMOTION_TYPE);
      },
    }
  );
};
