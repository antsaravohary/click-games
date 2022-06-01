
import { Maybe } from "yup/lib/types";
import { PaginatorInfo, Scalars, SortOrder } from "./generated";


//type

export type ItemsGame={
  id:Scalars["ID"];
  name:Scalars["String"];
  description:Scalars["String"];
}


export declare type Game = {
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description:Scalars["String"];
  year:Scalars["Float"];
  quantity:Scalars["Int"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export declare type CreateGame={
  name: Scalars["String"];
  slug: Scalars["String"];
  description:Scalars["String"];
  year:Scalars["Float"];
  quantity:Scalars["Int"];
}
export declare type UpdateGame={
  name: Scalars["String"];
  description:Scalars["String"];
  year:Scalars["Float"];
  quantity:Scalars["Int"];
}

export type GamesQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type GamePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Game>;
};
