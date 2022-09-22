import { CreateFaq, UpdateFaq } from "@ts-types/faq-type";
import Base from "./base";

class Faq extends Base<CreateFaq, UpdateFaq> {}

export default new Faq();
