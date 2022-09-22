import { PaginatorInfo, Scalars, SortOrder, User } from "./generated";
export type StripeSession = {
  id: Scalars["Int"];
  data: Array<any>;
  status: Scalars["Int"];
  user_id: Scalars["Int"];
  user:User;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export type CreateStripeSession = {
  data: Array<any>;
  status: Scalars["Int"];
  user_id: Scalars["Int"];
};
export type UpdateStripeSession = {
  data: Array<any>;
  status: Scalars["Int"];
  user_id: Scalars["Int"];
};
export type StripeSessionQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type StripeSessionPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<StripeSession>;
};
