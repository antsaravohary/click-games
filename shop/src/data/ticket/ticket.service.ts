import { Message } from "@ts-types/generated";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { timeStamp } from "console";

export type TicketType = {
  subject: string;
  description: string;
};
type AddMessageToTicketType={
  ticket_id:string;
  message:Message
}

class Ticket extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
  createTicket(input: TicketType) {
    return this.http
      .post(this._base_path,input)
      .then((res) => res.data);
  }
  addMessageToTicket(input:AddMessageToTicketType){
    return this.http
      .put(this._base_path+"/"+input.ticket_id,input)
      .then((res)=>res.data);

  }
  fetchTicket(){
    return this.http
      .get(this._base_path)
      .then((res)=>res.data);
  }
  
}

export const TicketService = new Ticket("tickets");