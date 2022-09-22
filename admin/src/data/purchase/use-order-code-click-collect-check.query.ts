import Order from "@repositories/order";
import { useQuery } from "react-query";
import { Order as TOrder } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchOrder = async (id: string) => {
  const { data } = await Order.find(`${API_ENDPOINTS.CHECK_CLICK_COLLECT_CODE}/${id}`);
  return { order: data };
};

type OrderResponse = {
  order: TOrder;
};

export const useOrderCodeClickCollectCheckQuery = (id: string) => {
  return useQuery<OrderResponse, Error>([API_ENDPOINTS.CHECK_CLICK_COLLECT_CODE, id], () =>
    fetchOrder(id)
  );
};
