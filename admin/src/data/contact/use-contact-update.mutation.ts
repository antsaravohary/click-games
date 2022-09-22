
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
export interface IContactUpdateVariables {
  variables: {
    id: string;
    input: any;
  };
}

export const useUpdateContactMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IContactUpdateVariables) =>
      Tag.update(`${API_ENDPOINTS.CONTACT}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("E-mail a été envoyé avec succès");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.CONTACT);
      },
    }
  );
};
