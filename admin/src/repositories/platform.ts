
import { CreatePlatform, UpdatePlatform } from "@ts-types/platforms-type";
import Base from "./base";

class Platform extends Base<CreatePlatform, UpdatePlatform> {}

export default new Platform();
