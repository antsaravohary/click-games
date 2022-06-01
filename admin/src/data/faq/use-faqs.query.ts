import { QueryParamsType, TagsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { FaqPaginator, FaqsQueryOptionsType } from "@ts-types/faq-type";
import faq from "@repositories/faq";

const fetchFaqs = async ({
  queryKey,
}: QueryParamsType): Promise<{ faqs: FaqPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as FaqsQueryOptionsType;

  const searchString = stringifySearchQuery({
    subject: text,
    type,
  });
  const url = `${API_ENDPOINTS.FAQ}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await faq.all(url);
  return {
    faqs: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useFaqsQuery = (options: FaqsQueryOptionsType) => {
  return useQuery<{ faqs: FaqPaginator }, Error>(
    [API_ENDPOINTS.FAQ, options],
    fetchFaqs,
    {
      keepPreviousData: true,
    }
  );
};

export { useFaqsQuery, fetchFaqs };
