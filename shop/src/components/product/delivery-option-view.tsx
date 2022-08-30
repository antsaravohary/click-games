import { CheckMark } from "@components/icons/checkmark";

const DeliveryOptionView = ({ product }: any) => {
  return (
    <>
      <div className="max-w-sm">
        {!!product.click_collect&&
         <div className="flex justify-between">
         <div>Click&Collect</div>
         <div className="text-green-500 flex align-center items-center">
           <CheckMark width={16} height={16} />{" "}
           <span className="ml-2">Disponible</span>
         </div>
       </div>
        }
      </div>
    </>
  );
};
export default DeliveryOptionView;
