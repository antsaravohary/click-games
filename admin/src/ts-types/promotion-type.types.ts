import { Attachment, Maybe, PaginatorInfo, Scalars, SortOrder } from "./generated";

export declare type PromotionType = {
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Float"];
  max_product:Scalars["Int"];
  options: Array<any>;
  created_at: Scalars["DateTime"];
    updated_at: Scalars["DateTime"];
};
export declare type CreatePromotionType = {
  image?: Maybe<Attachment>;
  title: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Float"];
  options: Array<any>;
};
export declare type UpdatePromotionType = {
  title: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Float"];
  options: Array<any>;
};

export type PromotionTypeQueryOptionsType = {
  title?:string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

/** A paginated list of Category items. */
export declare type PromotionTypePaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Category items. */
  data: Array<PromotionType>;
};
