import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";


class Transaction extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
}
export const TransactionService = new Transaction(API_ENDPOINTS.TRANSACTION);
