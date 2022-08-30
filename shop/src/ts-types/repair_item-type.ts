import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type repair_item = { 
id: Scalars["Int"];
price: Scalars["Float"];
total_price: Scalars["Float"];
repair_id: Scalars["Int"];
repair_price_id: Scalars["Int"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type Createrepair_item = { 
price: Scalars["Float"];
total_price: Scalars["Float"];
repair_id: Scalars["Int"];
repair_price_id: Scalars["Int"];
}
export type Updaterepair_item = { 
price: Scalars["Float"];
total_price: Scalars["Float"];
repair_id: Scalars["Int"];
repair_price_id: Scalars["Int"];
}
 export type repair_itemQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type repair_itemPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<repair_item>;};