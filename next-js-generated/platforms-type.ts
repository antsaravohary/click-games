import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type platform = { 
id: Scalars["Int"];
name: Scalars["String"];
slug: Scalars["String"];
description: Scalars["String"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type Createplatform = { 
name: Scalars["String"];
slug: Scalars["String"];
description: Scalars["String"];
}
export type Updateplatform = { 
name: Scalars["String"];
slug: Scalars["String"];
description: Scalars["String"];
}
 export type platformQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type platformPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<platform>;};