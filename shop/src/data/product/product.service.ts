import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export type CustomerType = {
  id: string;
  [key: string]: unknown;
};
export type ProductType = {
  name: string;
  price:number;
  brand_id:undefined|number;
  model_brand_id:undefined|number;
  description: string;
  gallery:[],
  image:{},
  product_condition:string;
  type:undefined|string|number;
  product_information:{
  }
  
};

class Product extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
  createProduct(input: ProductType) {
    return this.http
      .post(this._base_path, input)
      .then((res) => res.data);
  }
  contact(input: ContactType) {
    return this.http.post(API_ENDPOINTS.CONTACT, input).then((res) => res.data);
  }
  deleteAddress({ id }: { id: string }) {
    return this.http
      .delete(`${API_ENDPOINTS.ADDRESS}/${id}`)
      .then((res) => res.data);
  }
}

export const ProductService = new Product("products");
