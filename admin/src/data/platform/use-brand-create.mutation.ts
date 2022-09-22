
import { ROUTES } from "@utils/routes";
import Brand from "@repositories/tag";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { CreateBrand } from "@ts-types/brand-type";

export interface IBrandCreateVariables {
  variables: { input: CreateBrand };
}

export const useCreateBrandMutation = (redirect:boolean=true) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IBrandCreateVariables) =>
      Brand.create(API_ENDPOINTS.BRAND, input),
    {
      onSuccess: () => {
        if(redirect){
          router.push(ROUTES.BRAND);
        }
     
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.BRAND);
      },
    }
  );
};
