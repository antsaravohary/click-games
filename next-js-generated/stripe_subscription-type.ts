import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Stripe_subscription = { 
id: Scalars["Int"];
subscription_id: Scalars["String"];
current_period_start: Scalars["DateTime"];
current_period_end: Scalars["DateTime"];
type: Scalars["String"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
status: tinyint(1);
credit: Scalars["Int"];
}
export type CreateStripe_subscription = { 
subscription_id: Scalars["String"];
current_period_start: Scalars["DateTime"];
current_period_end: Scalars["DateTime"];
type: Scalars["String"];
status: tinyint(1);
credit: Scalars["Int"];
}
export type UpdateStripe_subscription = { 
subscription_id: Scalars["String"];
current_period_start: Scalars["DateTime"];
current_period_end: Scalars["DateTime"];
type: Scalars["String"];
status: tinyint(1);
credit: Scalars["Int"];
}
 export type Stripe_subscriptionQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type Stripe_subscriptionPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Stripe_subscription>;};