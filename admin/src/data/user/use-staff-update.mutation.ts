import { AddStaffInput, UpdateUser } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import shop from "@repositories/shop";

export interface IStaffUpdateVariables {
  variables: { id: number; input: AddStaffInput };
}

export const useUpdateStaffMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IStaffUpdateVariables) =>
      shop.updateStaff(`${API_ENDPOINTS.STAFFS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
      },
    }
  );
};
