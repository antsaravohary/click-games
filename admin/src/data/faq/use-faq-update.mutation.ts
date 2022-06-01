
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { UpdateFaq } from "@ts-types/faq-type";
export interface IFaqUpdateVariables {
  variables: {
    id: string;
    input: UpdateFaq;
  };
}

export const useUpdateFaqMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IFaqUpdateVariables) =>
      Tag.update(`${API_ENDPOINTS.FAQ}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.FAQ);
      },
    }
  );
};
