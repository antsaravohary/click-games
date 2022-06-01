import http from "@utils/api/http";
import { useQuery } from "react-query";

export const fetchStripeSubscription = async (priceid: string) => {
  const { data } = await http.get(`stripe/subscription/${priceid}`);
  return data;
};

export const useStripeSubscriptionPay = (priceid: string) => {
    return useQuery<any, Error>(["`stripe/subscription/", priceid], () =>
    fetchStripeSubscription(priceid)
    );
  };
