import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type delivery = { 
id: Scalars["Int"];
tracking_number: Scalars["String"];
tracking_url: Scalars["String"];
status: Scalars["String"];
delay: Scalars["String"];
sender_address_id: Scalars["Int"];
receiver_address_id: Scalars["Int"];
}
export type Createdelivery = { 
tracking_number: Scalars["String"];
tracking_url: Scalars["String"];
status: Scalars["String"];
delay: Scalars["String"];
sender_address_id: Scalars["Int"];
receiver_address_id: Scalars["Int"];
}
export type Updatedelivery = { 
tracking_number: Scalars["String"];
tracking_url: Scalars["String"];
status: Scalars["String"];
delay: Scalars["String"];
sender_address_id: Scalars["Int"];
receiver_address_id: Scalars["Int"];
}
 export type deliveryQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type deliveryPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<delivery>;};