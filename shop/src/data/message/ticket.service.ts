
import { CoreApi } from "@utils/api/core.api";


class Message extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
  
}

export const MessageService = new Message("messages");