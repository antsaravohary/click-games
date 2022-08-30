import { useMutation, useQueryClient } from "react-query";
import { ExchangeService } from "./exchange.service";
type ExchnageType = {
  id: string | number;
  input:any;
};

export const useUpdateExchangeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, input }: ExchnageType) => ExchangeService.update(id, input),
    {
      onSettled: () => {
        queryClient.invalidateQueries("exchanges");
      },
    }
  );
};
