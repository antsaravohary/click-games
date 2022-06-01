import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import modelMessage from "@repositories/model-message";
import { CreateModelMessage } from "@ts-types/model-messages-type";

export interface IModelMessageCreateVariables {
  variables: { input: CreateModelMessage };
}

export const useCreateModelMessageMutation = (redirect: boolean = true) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IModelMessageCreateVariables) =>
      modelMessage.create(API_ENDPOINTS.MODEL_MESSAGE, input),
    {
      onSuccess: () => {
        if (redirect) {
          router.push(ROUTES.MODEL_MESSAGE);
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.MODEL_MESSAGE);
      },
    }
  );
};
