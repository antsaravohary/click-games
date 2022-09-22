import { CreateContact, UpdateContact } from "@ts-types/contact-type";
import Base from "./base";

class Contact extends Base<CreateContact, UpdateContact> {}

export default new Contact();
