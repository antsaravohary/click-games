import { Children } from "react";
import { QueryKey } from "react-query";

export type CategoriesQueryOptionsType = {
  types?: string[];
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type NoticesQueryOptionsType={
  product_id:string;
  limit?: number;
}
export type ProductsQueryOptionsType = {
  type?: string;
  text?: string;
  exchangeable?:Boolean|number;
  category?: string;
  status?: string;
  limit?: number;
  user_id?:number;
  shop_id?: number;
  page?:number;
};

export type ShopsQueryOptionsType = {
  text?: string;
  name?:string;
  category?: string;
  status?: string;
  limit?: number;
  is_active?: number;
};
export type OrdersQueryOptionsType = {
  tracking_number?: string;
  orderBy?: string;
  sortedBy?: string;
  customer_id?: number;
  shop_id?: number;
  first?: number;
  page?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export declare type Type = {
  id: number | string;
  name: string;
  slug: string;
  icon: string;
  // products?: Maybe<ProductPaginator>;
  created_at: Date;
  updated_at: Date;
};
export declare type Coupon = {
  id: number | string;
  code: string;
  description: string;
  // orders: Order[];
  type: string;
  image: string;
  amount: number;
  active_from: Date;
  expire_at: Date;
  created_at: Date;
  updated_at: Date;
};
export declare type Category = {
  id: number | string;
  name: string;
  slug: string;
  parent?: number;
  children: Category[];
  details?: string;
  image?: Attachment;
  icon?: string;
  champs_required?:string[];
  type_label?:string;
  type: Type;
  types:Type[];
  products: Product[];
  created_at: Date;
  updated_at: Date;
};
export declare type Attachment = {
  id?: number | string;
  thumbnail?: string;
  original?: string;
};
export declare type AttributeValue = {
  id: string;
};
export declare type Variation = {
  id: string;
  options?: any;
};

export declare type Notice={
  id:string;
  pseudo:string;
  star:number;
  comment:string;
}
export declare type items_article={
  id?:number|string;
  title:string;
  content:string;
}

export declare type Article={
  id?: number | string;
  title:string;
  slug:string;
  items:items_article[];
  created_at?: Date;
  updated_at?: Date;
}

export declare type Product = {
  id?: number | string;
  name?: string;
  slug?: string;
  type?: Type;
  categories?: Category[];
  variations: AttributeValue[];
  variation_options: Variation[];
  // pivot?: OrderProductPivot
  // orders: Order[]
  shop?: any;
  description?: string;
  in_stock?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  sku?: string;
  gallery?: Attachment[];
  image?: Attachment;
  status?: any;
  height?: string;
  length?: string;
  width?: string;
  price?: number;
  min_price?: number;
  max_price?: number;
  related_products?: Product[];
  quantity?: number;
  notice?:Notice;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};

export declare type UserAddress = {
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
};
export declare type OrderStatus = {
  name?: string;
};

export declare type Order = {
  id: number | string;
  tracking_number: string;
  ref: string;
  customer_id: number | string;
  // customer?: Maybe<User>;
  status: OrderStatus;
  amount: number;
  children: Order[];
  sales_tax: number;
  total: number;
  mode_click_collect:string;
  paid_total: number;
  payment_id?: string;
  shipping?:ShippingType;
  payment_gateway?: string;
  coupon?: Coupon;
  discount?: number;
  delivery_fee?: number;
  delivery_time: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
  billing_address?: UserAddress;
  shipping_address?: UserAddress;
};

export type SettingsType = {
  id: number | string;
  options: SettingsOptions;
};


export type ShippingType = {
  id: number | string;
  name:string;
  delay:string;
};


export type FaqType = {
  id: number | string;
  subject:string;
  content:string;
};
export type ModeleType = {
  id: number | string;
  name:string;
};
export type BrandType = {
  id: number | string;
  name:string;
  modeles:ModeleType[]
};
export type SettingsOptions = {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  logo?: Attachment;
  taxClass?: string;
  shippingClass?: string;
};

export type Shop = {
  [key: string]: any;
};
