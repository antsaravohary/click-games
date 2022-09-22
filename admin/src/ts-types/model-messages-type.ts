import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type ModelMessage = { 
id: Scalars["Int"];
deleted_at: Scalars["DateTime"];
title: Scalars["String"];
content: Scalars["String"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type CreateModelMessage = { 
deleted_at: Scalars["DateTime"];
title: Scalars["String"];
content: Scalars["String"];
}
export type UpdateModelMessage = { 
deleted_at: Scalars["DateTime"];
title: Scalars["String"];
content: Scalars["String"];
}
 export type ModelMessageQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type ModelMessagePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<ModelMessage>;};