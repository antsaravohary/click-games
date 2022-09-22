import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import refund from "@repositories/refund";

export const useRefundFinishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) => refund.finish(API_ENDPOINTS.REFUND_FINISH, { id }),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.REFUND);
      },
    }
  );
};
