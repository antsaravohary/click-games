import { QueryParamsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { TagPaginator } from "@ts-types/generated";
import { PlatformPaginator, PlatformsQueryOptionsType } from "@ts-types/platforms-type";
import Platform from "@repositories/brand";

const fetchPlatforms = async ({
  queryKey,
}: QueryParamsType): Promise<{ platforms: PlatformPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as PlatformsQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.PLATFORM}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Platform.all(url);
  return {
    platforms: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const usePlatformsQuery = (options: PlatformsQueryOptionsType) => {
  return useQuery<{ platforms: PlatformPaginator }, Error>(
    [API_ENDPOINTS.PLATFORM, options],
    fetchPlatforms,
    {
      keepPreviousData: true,
    }
  );
};

export { usePlatformsQuery, fetchPlatforms };
