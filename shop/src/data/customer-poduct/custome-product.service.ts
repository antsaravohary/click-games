import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";


class CustomerProduct extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
}
export const CustomerProductService = new CustomerProduct(API_ENDPOINTS.CUSTOMER_PRODUCT);
