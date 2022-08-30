import { useMutation } from "react-query";
import { OrderService, VerifyCheckoutInputType } from "./transaction.service";

export const useVerifyCheckoutMutation = () => {
  return useMutation((input: VerifyCheckoutInputType) =>
    OrderService.verifyCheckout(input)
  );
};
