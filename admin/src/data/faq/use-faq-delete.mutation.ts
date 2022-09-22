import { useMutation, useQueryClient } from "react-query";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useDeleteFaqMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Tag.delete(`${API_ENDPOINTS.FAQ}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.FAQ);
      },
    }
  );
};
