import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";



class PurchaseGame extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
}
export const PurchaseGameService = new PurchaseGame(API_ENDPOINTS.PURCHASE_GAME);
