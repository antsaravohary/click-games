import {
  CheckoutVerificationInput,
  CreateOrder,
  UpdateOrder,
} from "@ts-types/generated";
import Base from "./base";

class Order extends Base<CreateOrder, UpdateOrder> {
  verify = async (url: string, variables: CheckoutVerificationInput) => {
    return this.http<CheckoutVerificationInput>(url, "post", variables);
  };
  check_click_collect_code = async (url: string) => {
    return this.http(url, "get");
  };
}

export default new Order();
