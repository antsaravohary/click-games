import {

	CreatePromotion,

} from "@ts-types/generated";
import { UpdatePromotionType } from "@ts-types/promotion-type.types";
import Base from "./base";

class Promotion extends Base<CreatePromotion, UpdatePromotionType> {
	
}

export default new Promotion();
