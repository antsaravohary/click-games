import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import contact from "@repositories/contact";
import { CreateContact } from "@ts-types/contact-type";

export interface IContactCreateVariables {
  variables: { input: CreateContact };
}

export const useContactMutation = (redirect: boolean = true) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IContactCreateVariables) =>
      contact.create(API_ENDPOINTS.CONTACT, input),
    {
      onSuccess: () => {
        if (redirect) {
          router.push(ROUTES.CONTACT);
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.CONTACT);
      },
    }
  );
};
