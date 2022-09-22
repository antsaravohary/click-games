
import { Maybe } from "yup/lib/types";
import { PaginatorInfo, Scalars, SortOrder } from "./generated";




export declare type Faq = {
  id: Scalars["ID"];
  subject: Scalars["String"];
  content: Scalars["String"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export declare type CreateFaq={
  subject: Scalars["String"];
  content: Scalars["String"];
}
export declare type UpdateFaq={
  subject: Scalars["String"];
  content: Scalars["String"];
}

export type FaqsQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type FaqPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Faq>;
};
