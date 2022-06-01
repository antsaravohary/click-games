import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { UpdateModelMessage } from "@ts-types/model-messages-type";
export interface IModelMessageUpdateVariables {
  variables: {
    id: string;
    input: UpdateModelMessage;
  };
}

export const useUpdateModelMessageMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IModelMessageUpdateVariables) =>
      Tag.update(`${API_ENDPOINTS.MODEL_MESSAGE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.MODEL_MESSAGE);
      },
    }
  );
};
