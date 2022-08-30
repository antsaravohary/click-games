import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";



class Address extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }


}
export const AddressService = new Address(API_ENDPOINTS.ADDRESS);
