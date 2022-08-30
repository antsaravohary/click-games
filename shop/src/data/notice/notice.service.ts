
import { CoreApi } from "@utils/api/core.api";

export type NoticeType = {
  star: number;
  pseudo:string;
  comment: string;
  product_id?:string;
};


class Notice extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
  create(input: NoticeType) {
    return this.http
      .post(this._base_path,input)
      .then((res) => res.data);
  }
  show(){
    return this.http
      .get(this._base_path)
      .then((res)=>res.data);
  }
  fetch(input:any){
    return this.http
    .get(this._base_path,input)
    .then((res)=>res.data);
  }
}

export const NoticeService = new Notice("notices");