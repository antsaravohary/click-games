import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";
import { ShippingType } from "@ts-types/custom.types";

const SettingsService = new CoreApi(API_ENDPOINTS.SHIPPINGS);

export const fetchShipping = async () => {
  const { data } = await SettingsService.findAll();
  return { shippings: data as ShippingType[] };
};

export const useShippingQuery = () => {
  return useQuery<{shippings:ShippingType[]}, Error>(
    API_ENDPOINTS.SHIPPINGS,
    fetchShipping
  );
};
