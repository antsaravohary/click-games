import { useBrandQuery } from "@data/brand/use-brand.query";
import { Category } from "@ts-types/custom.types";
import { champs_required_data } from "@utils/data";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { Key } from "react";

require("dayjs/locale/fr");
dayjs.locale("fr");
interface Props {
  product: any;
}

export const ProductUserInformationSup = ({ product }: Props) => {
  const champs_required = product?.categories[1]?.champs_required;
  const {t}=useTranslation("common");
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
      {champs_required?.map((champ: string) => {
        const champ_data=champs_required_data.find(c=>c.value===champ);
        let value:any=product.information[champ];
        switch (champ) {
          case "type":
          value=product?.type?.name;
          break;
          case "status":
            value=t(`text-product-condition-${product.product_condition}`);
            break;
          case "brand":
             value= product?.brand?.name+" / "+product?.modele?.name
            break;
        
          default:
            if(champ_data?.options){
            value=champ_data?.options?.find((o:{label:string;value:number})=>o.value===value)?.label;
              
            }
            break;
        }
        return (
          <div key={champ} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{champ_data?.label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
};
