import { Order } from "@ts-types/custom.types";
import { Message, User } from "@ts-types/generated";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { timeStamp } from "console";

export type RefundType = {
  amount: number;
  status: string;
  reason: string;
  order: Order;
  customer: User;
};
type AddMessageToTicketType = {
  ticket_id: string;
  message: Message;
};

class Refund extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }

  fetchTicket() {
    return this.http.get(this._base_path).then((res) => res.data);
  }
}

export const RefundService = new Refund("refunds");
