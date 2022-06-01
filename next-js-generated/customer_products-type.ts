import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type customer_product = { 
id: Scalars["Int"];
product_id: Scalars["Int"];
user_id: Scalars["Int"];
status: tinyint(1);
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type Createcustomer_product = { 
product_id: Scalars["Int"];
user_id: Scalars["Int"];
status: tinyint(1);
}
export type Updatecustomer_product = { 
product_id: Scalars["Int"];
user_id: Scalars["Int"];
status: tinyint(1);
}
 export type customer_productQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type customer_productPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<customer_product>;};