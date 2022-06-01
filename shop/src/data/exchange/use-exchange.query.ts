import { Exchange } from "@ts-types/exchanges-type";
import { useQuery } from "react-query";
import { ExchangeService } from "./exchange.service";

export const fetchExchange = async (exchangeId: string) => {
  const { data } = await ExchangeService.findOne(`${exchangeId}`);
  return {
    exchange: data,
  };
};
export const useExchangeQuery = ({ ref }: { ref: string }) => {
  return useQuery<{ exchange: Exchange }, Error>(["exchanges", ref], () =>
    fetchExchange(ref)
  );
};
