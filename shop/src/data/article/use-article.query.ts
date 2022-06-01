import { Article, Product } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";

export const fetchArticle = async (slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.ARTICLE}/${slug}`);
  return data;
};

export const useArticleQuery = (slug: string) => {
  return useQuery<Article, Error>([API_ENDPOINTS.ARTICLE, slug], () =>
    fetchArticle(slug)
  );
};
