import { useMutation } from "react-query";
import { PurchaseGameService } from "./purchase-game.service";

type PurchaseGameCreateInputType = {
  id: string | number;
  input: {
    [key: string]: unknown;
  };
};

export const useUpdatePurchaseGameMutation = () => {
  return useMutation(({ id, input }: PurchaseGameCreateInputType) =>
    PurchaseGameService.update(id, input)
  );
};
