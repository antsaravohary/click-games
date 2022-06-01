import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Exchange = {
  id: Scalars["Int"];
  ref: Scalars["String"];
  customer_product_id: Scalars["Int"];
  shop_product_id: Scalars["Int"];
  status: Scalars["String"];
  amount: Scalars["Float"];
  obs: Scalars["String"];
  total_paid: Scalars["Float"];
  received_at: Scalars["DateTime"];
  paid_at: Scalars["DateTime"];
  valid_at: Scalars["DateTime"];
  return_at: Scalars["DateTime"];
  send_delivery_id: Scalars["Int"];
  return_delivery_id: Scalars["Int"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export type CreateExchange = {
  ref: Scalars["String"];
  customer_product_id: Scalars["Int"]|string;
  shop_product_id: Scalars["Int"]|string;

};
export type UpdateExchange = {
  ref: Scalars["String"];
  customer_product_id: Scalars["Int"];
  shop_product_id: Scalars["Int"];
  status: Scalars["String"];
  amount: Scalars["Float"];
  obs: Scalars["String"];
  total_paid: Scalars["Float"];
  received_at: Scalars["DateTime"];
  paid_at: Scalars["DateTime"];
  valid_at: Scalars["DateTime"];
  return_at: Scalars["DateTime"];
  send_delivery_id: Scalars["Int"];
  return_delivery_id: Scalars["Int"];
};
export type ExchangeQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ExchangePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Exchange>;
};
