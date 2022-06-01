import PriceView from "@components/common/price-view";
import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdatePurchaseGameMutation } from "@data/purchase-game/use-update-purchase-game.mutation";
import { useMemo } from "react";

const ChatData = ({ data }: any) => {
  console.log("data",data);
    const {openModal}=useModalAction();
  switch (data.type) {
    case "PPP":
      const total = useMemo(() => {
        let total = 0;
        if (data.data.products) {
          data.data.products.forEach((p: any) => {
            total += p.total_price;
          });
        }
        return total;
      }, [data.data.products]);
      return (
        <div className="flex flex-col mt-2 items-center justify-center w-full px-4 border p-4">
          <p className="mb-5">Montant de l'offre est de <PriceView amount={total}/></p>
        
          <Button
          onClick={()=>openModal("PURCHASE_PURPOSE_VIEW",{message:data})}
          size="small"
          className="bg-green-500 hover:bg-green-600">Detail</Button>
        </div>
      );
      break;

    default:
      return <div>tt</div>;
      break;
  }
};
export default ChatData;
