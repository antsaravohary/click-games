import { CreateRepair, UpdateRepair } from "@ts-types/repairs-type";
import Base from "./base";

class Repair extends Base<CreateRepair, UpdateRepair> {}

export default new Repair();
