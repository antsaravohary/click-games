import { useMutation } from "react-query";
import { OrderService, VerifyCheckoutInputType } from "./exchange.service";

export const useVerifyCheckoutMutation = () => {
  return useMutation((input: VerifyCheckoutInputType) =>
    OrderService.verifyCheckout(input)
  );
};
