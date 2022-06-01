import { useMutation, useQueryClient } from "react-query";
import Exchange from "@repositories/exchange";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IOrderUpdateVariables {
  variables: { id: string | number; input: any };
}

export const useUpdateExchangeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IOrderUpdateVariables) =>
      Exchange.update(`${API_ENDPOINTS.EXCHANGE}/${id}`, input),
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.EXCHANGE);
      },
    }
  );
};
