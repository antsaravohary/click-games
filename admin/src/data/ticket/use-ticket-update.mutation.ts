import { TicketUpdateInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import ticket from "@repositories/ticket";
export interface ITicketUpdateVariables {
  variables: {
    id: string;
    input: TicketUpdateInput;
  };
}

export const useUpdateTicketMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: ITicketUpdateVariables) =>
      ticket.update(`${API_ENDPOINTS.TICKET}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TICKET);
      },
    }
  );
};
