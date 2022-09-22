import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import faq from "@repositories/faq";
import { CreateFaq } from "@ts-types/faq-type";

export interface IFaqCreateVariables {
  variables: { input: CreateFaq };
}

export const useCreateFaqMutation = (redirect: boolean = true) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IFaqCreateVariables) =>
      faq.create(API_ENDPOINTS.FAQ, input),
    {
      onSuccess: () => {
        if (redirect) {
          router.push(ROUTES.FAQ);
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.FAQ);
      },
    }
  );
};
