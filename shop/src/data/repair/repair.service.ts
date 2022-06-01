import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export type VerifyCheckoutInputType = {
  amount: number;
  products: any[];
  billing_address: any;
  shipping_address: any;
  shipping_class_id:any;
};

class Repair extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }

  verifyCheckout(input: VerifyCheckoutInputType) {
    return this.http
      .post(API_ENDPOINTS.REPAIR, input)
      .then((res) => res.data);
  }
}
export const RepairService = new Repair(API_ENDPOINTS.REPAIR);
