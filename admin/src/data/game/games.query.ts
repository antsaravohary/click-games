import {
  QueryParamsType,
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Game from "@repositories/game";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { GameQueryOptionsType } from "@ts-types/games-type";

const fetchGames = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as GameQueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
    type,
  });
  const url = `${API_ENDPOINTS.GAME}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Game.all(url);
  return { games: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useGamesQuery = (
  params: GameQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>([API_ENDPOINTS.GAME, params], fetchGames, {
    ...options,
    keepPreviousData: true,
  });
};

export { useGamesQuery, fetchGames };
