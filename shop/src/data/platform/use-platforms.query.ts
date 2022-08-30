import { Type } from "@ts-types/custom.types";
import { Platform } from "@ts-types/platforms-type";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const PlatformService = new CoreApi(API_ENDPOINTS.PLATFORM);
export const fetchPlatforms = async () => {
  const { data } = await PlatformService.findAll();
  return { platforms: data as Platform[] };
};
export const usePlatformsQuery = () => {
  return useQuery<{ platforms: Platform[] }, Error>(API_ENDPOINTS.PLATFORM, fetchPlatforms);
};
