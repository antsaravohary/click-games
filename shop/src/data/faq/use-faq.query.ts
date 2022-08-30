import { FaqType } from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const faqService = new CoreApi(API_ENDPOINTS.FAQ);

export const fetchFaq = async () => {
  const { data } = await faqService.findAll();
 
  return data;
};

export const useFaqQuery = () => {
  return useQuery<FaqType[], Error>(
    API_ENDPOINTS.FAQ,
    fetchFaq
  );
};
