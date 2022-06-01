import { CubeIcon } from "@components/icons/shops/cube";
import { DollarIcon } from "@components/icons/shops/dollar";
import { FacebookIcon, InstagramIcon } from "@components/icons/social";
import { Promotion } from "@ts-types/promotion.type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { useTranslation } from "react-i18next";
type Porps = {
  promotion: Promotion | undefined;
};
const PromotionDetail = ({ promotion }: Porps) => {
  const { t } = useTranslation();
  if(!promotion){
    return <div>Chargement ....</div>
  }
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-wrap mb-4 justify-center bg-white">
        <div className="border border-gray-100 w-[150px]">
          <div className="flex items-center mt-auto px-4 h-full">
            <p className="text-lg font-semibold text-sub-heading my-auto">
              {promotion?.promotion_type?.title}
            </p>
          </div>
        </div>
        <div className="border border-gray-100 w-[150px] ">
          <div className="flex items-center py-3 px-4">
            <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
              <DollarIcon width={12} />
            </div>

            <div className="ml-3">
              <p className="text-lg font-semibold text-sub-heading mb-0.5">
                {promotion?.promotion_type?.price} €
              </p>
              <p className="text-sm text-muted mt-0">par jour</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 w-[150px] ">
          <div className="flex items-center py-3 px-4">
            <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#183891] text-light">
              <CubeIcon width={18} />
            </div>

            <div className="ml-3">
              <p className="text-lg font-semibold text-sub-heading mb-0.5">
                {promotion?.promotion_type?.max_product} Produits
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 w-[150px] ">
          <div className="flex items-center justify-center py-4 px-4 space-x-3">
            {promotion?.promotion_type?.options.some(
              (s) => s === "Facebook"
            ) && (
              <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#183891] text-light">
                <FacebookIcon width={18} />
              </div>
            )}
            {promotion?.promotion_type?.options.some(
              (s) => s === "Instagram"
            ) && (
              <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#f1bc0e] text-light">
                <InstagramIcon width={18} />
              </div>
            )}
          </div>
        </div>

      </div>
      <div className="flex flex-col p-4">
          <div className="flex flex-col space-y-2">
            
            <h4>
              Status: <span className="text-gray-600 ">{t(promotion.status)}</span> 
            </h4>
            <h4>
              Durée: <span className="text-gray-600 ">{promotion.delay}</span> 
            </h4>
            <h4>
              Expiré: <span className="text-gray-600 ">{dayjs.utc(promotion.end_date).format("DD/MM/YYYY")}</span> 
            </h4>
          </div>
        </div>
    </div>
  );
};

export default PromotionDetail;
