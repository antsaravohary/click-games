import { CreatePurchase, UpdatePurchase } from "@ts-types/purchases-type";
import Base from "./base";

class Purchase extends Base<CreatePurchase, UpdatePurchase> {}

export default new Purchase();
