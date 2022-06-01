import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type CustomerProduct = { 
id: Scalars["Int"];
product_id: Scalars["Int"];
user_id: Scalars["Int"];
status: Scalars["Boolean"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type CreateCustomerProduct = { 
product_id: Scalars["Int"];
user_id: Scalars["Int"];
status: Scalars["Boolean"];
}
export type UpdateCustomerProduct = { 
product_id: Scalars["Int"];
user_id: Scalars["Int"];
status: Scalars["Boolean"];
}
 export type CustomerProductQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type CustomerProductPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<CustomerProduct>;};