import { ROUTES } from "@utils/routes";
import Game from "@repositories/game";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { CreateGame } from "@ts-types/games-type";

export const useCreateGameMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (input: CreateGame) => Game.create(API_ENDPOINTS.GAME, input),
    {
      onSuccess: () => {
        router.push(`/${router?.query?.shop}${ROUTES.GAME}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.GAME);
      },
    }
  );
};
