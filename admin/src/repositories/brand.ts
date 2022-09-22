
import { CreateBrand, UpdateBrand } from "@ts-types/brand-type";
import Base from "./base";

class Brand extends Base<CreateBrand, UpdateBrand> {}

export default new Brand();
