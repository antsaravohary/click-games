import Tag from "@repositories/tag";
import { useQuery } from "react-query";

import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Article as TArticle } from "@ts-types/article-type";

export const fetchArtile = async (id: string) => {
  const { data } = await Tag.find(`${API_ENDPOINTS.ARTICLE}/${id}`);
  return { article: data };
};

type IProps = {
  article: TArticle;
};

export const useArticleQuery = (id: string) => {
  return useQuery<IProps, Error>([API_ENDPOINTS.PROMOTION, id], () =>
    fetchArtile(id)
  );
};
