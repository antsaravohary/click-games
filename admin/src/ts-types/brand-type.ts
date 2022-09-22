
import { Maybe } from "yup/lib/types";
import { PaginatorInfo, Scalars, SortOrder } from "./generated";




export declare type Brand = {
  id: Scalars["ID"];
  name: Scalars["String"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export declare type CreateBrand={
  name: Scalars["String"];
  modeles:Array<any>;
  type:string;
  category_id:number;
}
export declare type UpdateBrand={
  name: Scalars["String"];
  modeles:Array<any>;
  type:string;
  category_id:number;
}


export type BrandsQueryOptionsType = {
  type?: string;
  text?: string;
  category_id?:string|null;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export declare type BrandPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Brand>;
};
