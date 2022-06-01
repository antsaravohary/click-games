
import { PaginatorInfo, Scalars, SortOrder } from "./generated";


export declare type Contact = {
  id: Scalars["ID"];
  name?: Scalars["String"];
  email: Scalars["String"];
  first_contact:Scalars["Boolean"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export declare type CreateContact={
  name?: Scalars["String"];
  email: Scalars["String"];
}

export type ContactsQueryOptionsType = {
  type?: string;
  text?: string;
  first_contact?:boolean;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type ContactPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Contact>;
};
