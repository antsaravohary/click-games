import { QueryParamsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ModelMessagePaginator, ModelMessageQueryOptionsType } from "@ts-types/model-messages-type";
import modelMessage from "@repositories/model-message";

const fetchModelMessages = async ({
  queryKey,
}: QueryParamsType): Promise<{ model_messages: ModelMessagePaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as ModelMessageQueryOptionsType;

  const searchString = stringifySearchQuery({
    title: text,
    type,
  });
  const url = `${API_ENDPOINTS.MODEL_MESSAGE}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await modelMessage.all(url);
  return {
    model_messages: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};
const useModelMessagesQuery = (options: ModelMessageQueryOptionsType) => {
  return useQuery<{ model_messages: ModelMessagePaginator }, Error>(
    [API_ENDPOINTS.MODEL_MESSAGE, options],
    fetchModelMessages,
    {
      keepPreviousData: true,
    }
  );
};
export { useModelMessagesQuery, fetchModelMessages };
