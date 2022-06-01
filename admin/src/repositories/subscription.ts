import { CreateSubscription, UpdateSubscription } from "@ts-types/stripe-subscription-type";
import Base from "./base";

class Subscription extends Base<CreateSubscription, UpdateSubscription> {}

export default new Subscription();
