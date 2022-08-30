import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Transaction = { 
id: Scalars["Int"];
object: Scalars["String"];
obs: Scalars["String"];
type: enum('credit','debit');
amount: Scalars["Float"];
data: longtext;
data_stripe: longtext;
user_id: Scalars["Int"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type CreateTransaction = { 
object: Scalars["String"];
obs: Scalars["String"];
type: enum('credit','debit');
amount: Scalars["Float"];
data: longtext;
data_stripe: longtext;
user_id: Scalars["Int"];
}
export type UpdateTransaction = { 
object: Scalars["String"];
obs: Scalars["String"];
type: enum('credit','debit');
amount: Scalars["Float"];
data: longtext;
data_stripe: longtext;
user_id: Scalars["Int"];
}
 export type TransactionQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type TransactionPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Transaction>;};