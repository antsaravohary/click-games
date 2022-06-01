import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";


const stripeService = new CoreApi(API_ENDPOINTS.SRIPE_CARD_DELETE);
export const useStripeCardDelete = () => {
    const queryClient = useQueryClient();
    return useMutation((id: string) =>
        stripeService.delete(id),{
            onSettled: () => {
                queryClient.invalidateQueries("stripe/cards");
              },
        }
    )
}