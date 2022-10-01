import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useCheckout } from "@contexts/checkout.context";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useShippingQuery } from "@data/shipping/use-shippings.query";
import { RadioGroup } from "@headlessui/react";
import { siteSettings } from "@settings/site.settings";
import { formatDateCompletWithDay } from "@utils/format-date";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface Props {
  count?: number;
  disabled?: boolean;
}

const ShippingMode = ({ count, disabled }: Props) => {
  const { updateDeliveryTime, setShippingClass, shipping_class } =
    useCheckout();
  const [selected, setSelected] = useState();
  const { data, isFetching: loading } = useShippingQuery();
  useEffect(() => {
    updateDeliveryTime(siteSettings.deliverySchedule[0]);
    if (!shipping_class && data?.shippings) {
      setShippingClass(data?.shippings[0]);
      setSelected(data?.shippings[0]);
    }
    setSelected(data?.shippings.find((s) => s.id == shipping_class));
  }, [data]);

  let dateDelivery = new Date(new Date().getTime() + shipping_class * 24 * 60 * 60 * 1000);
  switch (dateDelivery.getDay()) {
    case 0:
      dateDelivery = new Date(dateDelivery.getTime() + 2 * 24 * 60 * 60 * 1000);
      break;
    case 1:
      dateDelivery = new Date(dateDelivery.getTime() + 1 * 24 * 60 * 60 * 1000);
      break;
    case 2:
      dateDelivery = new Date(dateDelivery.getTime() + 1 * 24 * 60 * 60 * 1000);
      break;
    case 6:
      dateDelivery = new Date(dateDelivery.getTime() + 2 * 24 * 60 * 60 * 1000);
      break;

    default:
      break;
  }
  const { total } = useCart();
  function handleSelect(item: any) {
    setSelected(item);
    setShippingClass(item);
  }
  if (!data || loading) {
    return <div>Chargement...</div>;
  }
  return (
    <RadioGroup value={selected} onChange={handleSelect}>
      <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
      <div className="relative bg-white rounded-md space-y-4">
        {data?.shippings.map((s, planIdx) => (
          <RadioGroup.Option
            key={s.name}
            value={s}
            className={({ checked }) =>
              classNames(
                planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                planIdx === data?.shippings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                'relative border p-8 flex  flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
              )

            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex items-center text-lg">
                  <span
                    className={classNames(
                      checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                      active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                      'h-4 w-4 rounded-full border flex items-center justify-center'
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <RadioGroup.Label
                    as="span"
                    className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'ml-3 font-medium')}>
                    {s.name}
                  </RadioGroup.Label>
                </div>
                <RadioGroup.Description className="ml-6 pl-1 text-lg md:ml-0 md:pl-0 md:text-center">
                  <span className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'font-medium')}>
                    Frais de livraison:     {((total > 35 && s.id == 2) || s.type === "free_shipping") ? "Gratuit" : `${s.amount} €`}
                  </span>{' '}

                </RadioGroup.Description>
                <RadioGroup.Description
                  className={classNames(
                    checked ? 'text-indigo-700' : 'text-gray-500',
                    'ml-6 pl-1 text-lg md:ml-0 md:pl-0 md:text-right')}>
                  {formatDateCompletWithDay(dateDelivery.toDateString())}
                </RadioGroup.Description>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )

  return (
    <SectionWithCardGroup
      count={count}
      defaultChecked={data?.shippings.findIndex((s) => s.id == shipping_class)}
      heading="text-delivery-schedule"
      disabled={disabled}
      items={data?.shippings.map((s: any) => ({
        id: s.id,
        title: s.name,
        sub_description: s.delay,
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
