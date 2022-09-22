import { Maybe } from "yup/lib/types";
import { PaginatorInfo, Product, Scalars } from "./generated";
import { PromotionType } from "./promotion-type.types";

export declare type Promotion = {
  id: Scalars["ID"];
  status: Scalars["String"];
  amount: Scalars["Float"];
  total_amount: Scalars["Float"];
  delay: Scalars["Int"];
  promotion_type: Maybe<PromotionType>;
  products: Array<Product>;
  start_date: Scalars["DateTime"];
  end_date: Scalars["DateTime"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export declare type PromotionPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Promotion>;
};
