import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useCheckout } from "@contexts/checkout.context";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useShippingQuery } from "@data/shipping/use-shippings.query";
import { siteSettings } from "@settings/site.settings";
import { useEffect } from "react";

interface Props {
  count: number;
  disabled?:boolean;
}

const ShippingMode = ({ count,disabled }: Props) => {
  const { updateDeliveryTime, setShippingClass, shipping_class } =
    useCheckout();
    const { data, isFetching: loading } = useShippingQuery();
  useEffect(() => {
    updateDeliveryTime(siteSettings.deliverySchedule[0]);
    if(!shipping_class&&data?.shippings){
      setShippingClass(data?.shippings[0]);
    }
  }, [data]);


  const { total } = useCart();
  function handleSelect(item: any) {
    setShippingClass(item);
  }
  if (!data || loading) {
    return <div>Chargement...</div>;
  }

  return (
    <SectionWithCardGroup
      count={count}
      defaultChecked={data?.shippings.findIndex((s) => s.id == shipping_class)}
      heading="text-delivery-schedule"
      disabled={disabled}
      items={data?.shippings.map((s: any) => ({
        id: s.id,
        title: s.name,
        sub_description:s.delay,
        description:
          (total > 35 && s.id == 2) || s.type === "free_shipping"
            ? "Gratuit"
            : `${s.amount} € `//`à partir de ${s.amount} €`,
      }))}
      onSelect={handleSelect}
    />
  );
};

export default ShippingMode;
