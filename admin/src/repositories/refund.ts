import { CreateRefund, UpdateRefund } from "@ts-types/refund-type";
import Base from "./base";

class Refund extends Base<CreateRefund, UpdateRefund> {
  finish = async (url: string, variables: { id: number }) => {
    return this.http<{ id: number }>(url, "post", variables);
  };
}

export default new Refund();
