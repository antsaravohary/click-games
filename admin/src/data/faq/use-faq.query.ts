import Tag from "@repositories/tag";
import { useQuery } from "react-query";

import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Faq as TFaq } from "@ts-types/faq-type";

export const fetchArtile = async (id: string) => {
  const { data } = await Tag.find(`${API_ENDPOINTS.FAQ}/${id}`);
  return { faq: data };
};

type IProps = {
  faq: TFaq;
};

export const useFaqQuery = (id: string) => {
  return useQuery<IProps, Error>([API_ENDPOINTS.PROMOTION, id], () =>
    fetchArtile(id)
  );
};
