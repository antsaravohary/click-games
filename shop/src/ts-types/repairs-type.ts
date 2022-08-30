import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type repair = { 
id: Scalars["Int"];
ref: Scalars["String"];
amount: Scalars["Float"];
total_amount: Scalars["Float"];
total_paid: Scalars["Float"];
status: Scalars["String"];
obs: Scalars["String"];
receive_at: Scalars["DateTime"];
fixed_at: Scalars["DateTime"];
user_id: Scalars["Int"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
send_delivery_id: Scalars["Int"];
return_delivery_id: Scalars["Int"];
}
export type Createrepair = { 
ref: Scalars["String"];
amount: Scalars["Float"];
total_amount: Scalars["Float"];
total_paid: Scalars["Float"];
status: Scalars["String"];
obs: Scalars["String"];
receive_at: Scalars["DateTime"];
fixed_at: Scalars["DateTime"];
user_id: Scalars["Int"];
send_delivery_id: Scalars["Int"];
return_delivery_id: Scalars["Int"];
}
export type Updaterepair = { 
ref: Scalars["String"];
amount: Scalars["Float"];
total_amount: Scalars["Float"];
total_paid: Scalars["Float"];
status: Scalars["String"];
obs: Scalars["String"];
receive_at: Scalars["DateTime"];
fixed_at: Scalars["DateTime"];
user_id: Scalars["Int"];
send_delivery_id: Scalars["Int"];
return_delivery_id: Scalars["Int"];
}
 export type repairQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type repairPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<repair>;};