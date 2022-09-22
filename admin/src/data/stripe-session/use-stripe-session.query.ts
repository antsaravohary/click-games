import { QueryParamsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { StripeSessionQueryOptionsType } from "@ts-types/stripe-session-type";
import StripeSession from "@repositories/stripe-session";

const fetchStripeSession = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    page = 1,
    limit = 20,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as StripeSessionQueryOptionsType;
  const searchString = stringifySearchQuery({});
  const url = `${API_ENDPOINTS.STRIPE_SESSION}?search=${searchString}}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await StripeSession.all(url);
  return {
    stripe_sessions: { data, paginatorInfo: mapPaginatorData({ ...rest }) },
  };
};

const useStripeSessionsQuery = (
  params: StripeSessionQueryOptionsType = {},
  options: any = {}
) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.STRIPE_SESSION, params],
    fetchStripeSession,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useStripeSessionsQuery, fetchStripeSession };
