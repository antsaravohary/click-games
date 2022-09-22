import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Subscription } from "@ts-types/generated";
import http from "@utils/api/http";
import { useEffect, useState } from "react";

type Sprops = {
  shopId: string;
  subscription: undefined | Subscription | null;
  onSuccess?:any;
};

const SubscriptionButton = ({ shopId, subscription,onSuccess }: Sprops) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const {openModal}=useModalAction();

  return (
    <>
      {subscription?.subscription_id ? (
        <Button className="mt-16"  onClick={()=>openModal("SUBSCRIPTION_DETAIL")}>
          Gérer
        </Button>
      ) : (
        <Button className="mt-16" onClick={()=>openModal("SUBSCRIPTION_PAY",{onSuccess})}>
         S'abonner
        </Button>
      )}
    </>
  );
};
export default SubscriptionButton;
