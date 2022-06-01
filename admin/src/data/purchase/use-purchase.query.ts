import Repair from "@repositories/repair";
import { useQuery } from "react-query";
import { Purchase as TPurchase } from "@ts-types/purchases-type";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchPurchase = async (id: string) => {
  const { data } = await Repair.find(`${API_ENDPOINTS.PURCHASE}/${id}`);
  return { purchase: data };
};

type PurchaseResponse = {
  purchase: TPurchase;
};

export const usePurchaseQuery = (id: string) => {
  return useQuery<PurchaseResponse, Error>([API_ENDPOINTS.PURCHASE, id], () =>
    fetchPurchase(id)
  );
};
