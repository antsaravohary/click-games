import pickBy from "lodash/pickBy";
import Axios from "./http";
type NumberOrString = number | string;
export type ParamsType = {
  type?: string;
  types?: string[];
  text?: string;
  category?: string;
  status?: string;
  is_active?: string;
  shop_id?: string;
  product_id?: string;
  platform_id?:string;
  user_id?: string;
  limit?: number;
  orderBy?:string;
  sortedBy?:string,
  page?:number;
};
export class CoreApi {
  http = Axios;
  constructor(public _base_path: string) {}
  private stringifySearchQuery(values: any) {
    const parsedValues = pickBy(values);
    return Object.keys(parsedValues)
      .map((k) => {
        /*if (k === "type") {
          return `${k}.slug:${parsedValues[k]};`;
        }*/
        if (k === "types") {
          return `types.slug:${parsedValues[k]};`;
        }
        if (k === "category") {
          return `categories.slug:${parsedValues[k]};`;
        }
        return `${k}:${parsedValues[k]};`;
      })
      .join("")
      .slice(0, -1);
  }
  find(params: ParamsType) {
    const {
      types,
      type,
      text: name,
      page,
      category,
      status,
      is_active,
      shop_id,
      product_id,
      platform_id,
      limit = 30,
      orderBy = "updated_at",
      sortedBy = "DESC",
      exchangeable,
      user_id,
    } = params;
    const searchString = this.stringifySearchQuery({
      types,
      type,
      name,
      exchangeable,
      category,
      status,
      user_id,
      shop_id,
      platform_id,
      product_id,
      is_active,
    });
    const queryString = `?search=${searchString}&searchJoin=and&limit=${limit}&userId=${user_id}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return this.http.get(this._base_path + queryString);
  }
  findAll() {
    return this.http.get(this._base_path);
  }
  fetchUrl(url: string) {
    return this.http.get(url);
  }
  postUrl(url: string, data: any) {
    return this.http.post(url, data);
  }
  findOne(id: NumberOrString) {
    return this.http.get(`${this._base_path}/${id}`);
  }
  create(data: any, options?: any) {
    return this.http
      .post(this._base_path, data, options)
      .then((res) => res.data);
  }
  update(id: NumberOrString, data: any) {
    return this.http
      .put(`${this._base_path}/${id}`, data)
      .then((res) => res.data);
  }
  delete(id: NumberOrString) {
    return this.http.delete(`${this._base_path}/${id}`);
  }
}
