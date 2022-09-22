import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import article from "@repositories/article";
import { CreateArticle } from "@ts-types/article-type";

export interface IArticleCreateVariables {
  variables: { input: CreateArticle };
}

export const useCreateArticleMutation = (redirect: boolean = true) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IArticleCreateVariables) =>
      article.create(API_ENDPOINTS.ARTICLE, input),
    {
      onSuccess: () => {
        if (redirect) {
          router.push(ROUTES.ARTICLE);
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ARTICLE);
      },
    }
  );
};
