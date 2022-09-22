import { QueryParamsType, TagsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ArticlePaginator, ArticlesQueryOptionsType } from "@ts-types/article-type";
import article from "@repositories/article";

const fetchArticles = async ({
  queryKey,
}: QueryParamsType): Promise<{ articles: ArticlePaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as ArticlesQueryOptionsType;

  const searchString = stringifySearchQuery({
    title: text,
    type,
  });
  const url = `${API_ENDPOINTS.ARTICLE}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await article.all(url);
  return {
    articles: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useArticlesQuery = (options: ArticlesQueryOptionsType) => {
  return useQuery<{ articles: ArticlePaginator }, Error>(
    [API_ENDPOINTS.ARTICLE, options],
    fetchArticles,
    {
      keepPreviousData: true,
    }
  );
};

export { useArticlesQuery, fetchArticles };
