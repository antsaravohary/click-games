
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { UpdateArticle } from "@ts-types/article-type";
export interface IArticleUpdateVariables {
  variables: {
    id: string;
    input: UpdateArticle;
  };
}

export const useUpdateArticleMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IArticleUpdateVariables) =>
      Tag.update(`${API_ENDPOINTS.ARTICLE}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ARTICLE);
      },
    }
  );
};
