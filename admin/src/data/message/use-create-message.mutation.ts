import { CreateMessageInput } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Tag from "@repositories/tag";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IMessageCreateVariables {
  variables: { input: CreateMessageInput };
}

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IMessageCreateVariables) =>
      Tag.create(API_ENDPOINTS.MESSAGE, input),
    {
      onSuccess: () => {},

      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PURCHASE);
      },
    }
  );
};
