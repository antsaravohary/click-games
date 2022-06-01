import { Maybe } from "yup/lib/types";
import { Order, PaginatorInfo, Scalars, SortOrder } from "./generated";

export type ItemsRefund = {
  id: Scalars["ID"];
  amount: Scalars["String"];
  Order: Maybe<Order>;
};

export declare type Refund = {
  id: Scalars["ID"];
  amount: Scalars["String"];
  status:Scalars["String"];
  Order: Maybe<Order>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export declare type CreateRefund = {
amount:Scalars["Float"];
order_id:Scalars["Int"];
reason:Scalars["String"];
shop_id:Scalars["Int"];
};
export declare type UpdateRefund = {

};

export type RefundsQueryOptionsType = {
  shop_id?:number;
  status?:string;
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type RefundPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Refund>;
};
