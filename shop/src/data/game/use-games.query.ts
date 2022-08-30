import { QueryParamsType, Type } from "@ts-types/custom.types";
import { Game } from "@ts-types/games-type";
import { Platform } from "@ts-types/platforms-type";
import { CoreApi, ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQuery } from "react-query";
type purchaseGameSales = {
  [key: string]: unknown;
};
const GameService = new CoreApi(API_ENDPOINTS.GAME);
export const fetchGames = async ({ queryKey, pageParam }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const { data } = await GameService.find(params as ParamsType);
  return { games: { data: data as Game[] } };
};
export const useGamesQuery = (params: any) => {
  return useQuery<{ games: { data: Game[] } }, Error>(
    [API_ENDPOINTS.PLATFORM, params],
    fetchGames
  );
};

export const useCreateGameSaleMutation = () => {
  return useMutation((input: purchaseGameSales) => GameService.create(input));
};
