import Exchange from "@repositories/exchange";
import { useQuery } from "react-query";
import { Exchange as TExchange } from "@ts-types/exchanges-type";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchExchange = async (id: string) => {
  const { data } = await Exchange.find(`${API_ENDPOINTS.EXCHANGE}/${id}`);
  return { exchange: data };
};

type ExchangeResponse = {
  exchange: TExchange;
};

export const useExchangeQuery = (id: string) => {
  return useQuery<ExchangeResponse, Error>([API_ENDPOINTS.EXCHANGE, id], () =>
    fetchExchange(id)
  );
};
