import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

type OrderCreateInputType = {
    [key: string]: unknown;
};
const stripeService = new CoreApi(API_ENDPOINTS.STRIPE_CREATE);
export const useCreateStripe = () => {
    return useMutation((input: OrderCreateInputType) =>
        stripeService.create(input)
    )
}