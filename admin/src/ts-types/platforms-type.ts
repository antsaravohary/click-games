import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Platform = {
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export type CreatePlatform = {
  name: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
};
export type UpdatePlatform = {
  name: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
};
export type PlatformsQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type PlatformPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Platform>;
};
