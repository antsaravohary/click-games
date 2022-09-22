import Subscription from "@repositories/subscription";
import { useQuery } from "react-query";
import { Subscription as TSubscription } from "@ts-types/stripe-subscription-type";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchSubscription = async (id: string) => {
  const { data } = await Subscription.find(`${API_ENDPOINTS.SUBSCRIPTION}/${id}`);
  return { subscription: data };
};

type SubscriptionResponse = {
  subscription: TSubscription;
};

export const useSubscriptionQuery = (id: string) => {
  return useQuery<SubscriptionResponse, Error>([API_ENDPOINTS.SUBSCRIPTION, id], () =>
    fetchSubscription(id)
  );
};
