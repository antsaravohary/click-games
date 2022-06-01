import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Subscription from "@repositories/subscription";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchSubscription = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;
  const url = `${API_ENDPOINTS.SUBSCRIPTION}?search=${text}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Subscription.all(url);
  return { subscriptions: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};  

const useSubscriptionsQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.SUBSCRIPTION, options], fetchSubscription, {
    keepPreviousData: true,
  });
};

export { useSubscriptionsQuery, fetchSubscription };
