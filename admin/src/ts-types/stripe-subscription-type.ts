import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Subscription = {
  id: Scalars["Int"];
  subscription_id: Scalars["String"];
  current_period_start: Scalars["DateTime"];
  current_period_end: Scalars["DateTime"];
  type: Scalars["String"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  status: Scalars["Boolean"];
  credit: Scalars["Int"];
};
export type CreateSubscription = {
  subscription_id: Scalars["String"];
  current_period_start: Scalars["DateTime"];
  current_period_end: Scalars["DateTime"];
  type: Scalars["String"];
  status: Scalars["Boolean"];
  credit: Scalars["Int"];
};
export type UpdateSubscription = {
  subscription_id: Scalars["String"];
  current_period_start: Scalars["DateTime"];
  current_period_end: Scalars["DateTime"];
  type: Scalars["String"];
  status: Scalars["Boolean"];
  credit: Scalars["Int"];
};
export type SubscriptionQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type SubscriptionPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Subscription>;
};
