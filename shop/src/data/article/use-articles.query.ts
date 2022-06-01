import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Article,
} from "@ts-types/custom.types";
import { CoreApi, ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
const ArticleService = new CoreApi(API_ENDPOINTS.ARTICLE);
type PaginatedArticle = {
  data: Article[];
  paginatorInfo: any;
};
const fetchArticles = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedArticle> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await ArticleService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await ArticleService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useArticlesQuery = (
  params: ProductsQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedArticle,
    Error,
    PaginatedArticle,
    PaginatedArticle,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedArticle, Error>(
    [API_ENDPOINTS.ARTICLE, params],
    fetchArticles,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useArticlesQuery, fetchArticles };
