import {
  CreateStripeSession,
  UpdateStripeSession,
} from "@ts-types/stripe-session-type";
import Base from "./base";

class StripeSession extends Base<CreateStripeSession, UpdateStripeSession> {}

export default new StripeSession();
