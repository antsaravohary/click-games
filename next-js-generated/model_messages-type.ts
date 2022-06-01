import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Model_Message = { 
id: Scalars["Int"];
deleted_at: Scalars["DateTime"];
title: Scalars["String"];
content: Scalars["String"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type CreateModel_Message = { 
deleted_at: Scalars["DateTime"];
title: Scalars["String"];
content: Scalars["String"];
}
export type UpdateModel_Message = { 
deleted_at: Scalars["DateTime"];
title: Scalars["String"];
content: Scalars["String"];
}
 export type Model_MessageQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type Model_MessagePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Model_Message>;};