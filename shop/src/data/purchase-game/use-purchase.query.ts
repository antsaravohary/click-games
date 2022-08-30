import { Purchase } from "@ts-types/purchases-type";
import { useQuery } from "react-query";
import { PurchaseGameService } from "./purchase-game.service";

export const fetchPurchase = async (orderId: string) => {
  const { data } = await PurchaseGameService.findOne(`${orderId}`);
  return {
    purchase: data,
  };
};
export const usePurchaseQuery = ({ id }: { id: string }) => {
  return useQuery<{ purchase: Purchase }, Error>(["purchase", id], () =>
    fetchPurchase(id)
  );
};
