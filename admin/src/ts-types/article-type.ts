
import { Maybe } from "yup/lib/types";
import { PaginatorInfo, Scalars, SortOrder } from "./generated";


export type ItemsArticle={
  id:Scalars["ID"];
  title:Scalars["String"];
  content:Scalars["String"];
}


export declare type Article = {
  id: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  items:Maybe<Array<ItemsArticle>>
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export declare type CreateArticle={
  title: Scalars["String"];
  slug: Scalars["String"];
  items:Maybe<Array<ItemsArticle>>
}
export declare type UpdateArticle={
  title: Scalars["String"];
  slug: Scalars["String"];
  items:Maybe<Array<ItemsArticle>>
}

export type ArticlesQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type ArticlePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Article>;
};
