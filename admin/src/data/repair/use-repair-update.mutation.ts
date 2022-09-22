import { useMutation, useQueryClient } from "react-query";
import Repair from "@repositories/repair";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IOrderUpdateVariables {
  variables: { id: string|number; input: any };
}

export const useUpdateRepairMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IOrderUpdateVariables) =>
    Repair.update(`${API_ENDPOINTS.REPAIR}/${id}`, input),
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.REPAIR);
      },
    }
  );
};
