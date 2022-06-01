import { CreateExchange } from "@ts-types/exchanges-type";
import { useMutation } from "react-query";
import { ExchangeService } from "./exchange.service";

export const useCreateExchangeMutation = () => {
  return useMutation((input: CreateExchange) => ExchangeService.create(input));
};
