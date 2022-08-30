import { useMutation } from "react-query";
import { PurchaseGameService } from "./purchase-game.service";

type PurchaseGameCreateInputType = {
  [key: string]: unknown;
};

export const useCreatePurchaseGameMutation = () => {
  return useMutation((input: PurchaseGameCreateInputType) =>
    PurchaseGameService.create(input)
  );
};
