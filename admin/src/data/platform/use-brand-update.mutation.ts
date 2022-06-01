
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Brand from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { UpdateBrand } from "@ts-types/brand-type";
export interface IBrandUpdateVariables {
  variables: {
    id: string;
    input: UpdateBrand;
  };
}

export const useUpdateBrandMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IBrandUpdateVariables) =>
      Brand.update(`${API_ENDPOINTS.TAGS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TAGS);
      },
    }
  );
};
