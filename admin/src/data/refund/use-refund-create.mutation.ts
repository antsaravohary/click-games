import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import refund from "@repositories/refund";
import { CreateRefund } from "@ts-types/refund-type";

export interface IRefundCreateVariables {
  variables: { input: CreateRefund };
}

export const useCreateRefundMutation = (redirect: boolean = true) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IRefundCreateVariables) =>
      refund.create(API_ENDPOINTS.REFUND, input),
    {
 
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.REFUND);
      },
    }
  );
};
