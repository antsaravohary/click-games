
import { CreateModelMessage, UpdateModelMessage } from "@ts-types/model-messages-type";
import Base from "./base";

class ModelMessage extends Base<CreateModelMessage, UpdateModelMessage> {}

export default new ModelMessage();
