import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Game = {
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
  year: Scalars["Int"];
  quantity: Scalars["Int"];
  buy_price: Scalars["Float"];
  sale_price: Scalars["Float"];
  platform_id: Scalars["Int"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export type CreateGame = {
  name: Scalars["String"];
  description: Scalars["String"];
  year: Scalars["Int"];
  quantity: Scalars["Int"];
  buy_price: Scalars["Float"];
  sale_price: Scalars["Float"];
  platform_id: Scalars["Int"];
};
export type UpdateGame = {
  name?: Scalars["String"];
  slug?: Scalars["String"];
  description?: Scalars["String"];
  year?: Scalars["Int"];
  quantity?: Scalars["Int"];
  buy_price?: Scalars["Float"];
  sale_price?: Scalars["Float"];
  platform_id?: Scalars["Int"];
};
export type GameQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type GamePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Game>;
};
