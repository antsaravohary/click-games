import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type stripe_session = { 
id: Scalars["Int"];
data: longtext;
status: Scalars["Int"];
user_id: Scalars["Int"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type Createstripe_session = { 
data: longtext;
status: Scalars["Int"];
user_id: Scalars["Int"];
}
export type Updatestripe_session = { 
data: longtext;
status: Scalars["Int"];
user_id: Scalars["Int"];
}
 export type stripe_sessionQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type stripe_sessionPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<stripe_session>;};