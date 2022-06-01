import modelMessage from "@repositories/model-message";
import { useQuery } from "react-query";

import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ModelMessage as TModelMessage } from "@ts-types/model-messages-type";

export const fetchModelMessage = async (id: string) => {
  const { data } = await modelMessage.find(
    `${API_ENDPOINTS.MODEL_MESSAGE}/${id}`
  );
  return { model_message: data };
};

type IProps = {
  model_message: TModelMessage;
};

export const useModelMessageQuery = (id: string) => {
  return useQuery<IProps, Error>([API_ENDPOINTS.MODEL_MESSAGE, id], () =>
    fetchModelMessage(id)
  );
};
