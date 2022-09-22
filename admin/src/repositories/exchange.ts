import { CreateExchange, UpdateExchange } from "@ts-types/exchanges-type";
import Base from "./base";

class Exchange extends Base<CreateExchange, UpdateExchange> {}

export default new Exchange();
