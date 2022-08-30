import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Purchase = {
  id: Scalars["Int"];
  ref: Scalars["String"];
  amount: Scalars["Float"];
  sales_tax: Scalars["Float"];
  delivery_fee: Scalars["Float"];
  paid_total: Scalars["Float"];
  total: Scalars["Float"];
  status: Scalars["String"];
  tracking_number: Scalars["String"];
  shipping_company: Scalars["String"];
  address_id: Scalars["Int"];
  user_id: Scalars["Int"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  sender_address_id: Scalars["Int"];
  tracking_url: Scalars["String"];
  weight: Scalars["Float"];
  products:any[];
};
export type CreatePurchase = {
  ref: Scalars["String"];
  amount: Scalars["Float"];
  sales_tax: Scalars["Float"];
  delivery_fee: Scalars["Float"];
  paid_total: Scalars["Float"];
  total: Scalars["Float"];
  status: Scalars["String"];
  tracking_number: Scalars["String"];
  shipping_company: Scalars["String"];
  address_id: Scalars["Int"];
  user_id: Scalars["Int"];
  sender_address_id: Scalars["Int"];
  tracking_url: Scalars["String"];
  weight: Scalars["Float"];
};
export type UpdatePurchase = {
  ref: Scalars["String"];
  amount: Scalars["Float"];
  sales_tax: Scalars["Float"];
  delivery_fee: Scalars["Float"];
  paid_total: Scalars["Float"];
  total: Scalars["Float"];
  status: Scalars["String"];
  tracking_number: Scalars["String"];
  shipping_company: Scalars["String"];
  address_id: Scalars["Int"];
  user_id: Scalars["Int"];
  sender_address_id: Scalars["Int"];
  tracking_url: Scalars["String"];
  weight: Scalars["Float"];
};
export type PurchaseQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type PurchasePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Purchase>;
};
