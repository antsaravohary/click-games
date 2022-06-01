import { useMutation, useQueryClient } from "react-query";
import { OrderService } from "./order.service";

type OrderType = {
  id: string | number;
  input: any;
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, input }: OrderType) => OrderService.update(id, input),
    {
      onSettled: () => {
        queryClient.invalidateQueries("orders");
      },
    }
  );
};
