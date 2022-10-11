
import Address from "@components/address/address";
import Layout from "@components/layout/layout";
import { useEffect, useRef, useState } from "react";
import { useUI } from "@contexts/ui.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useModalAction } from "@components/ui/modal/modal.context";
import ShippingMode from "@components/checkout/shipping-mode";
import { loggedIn } from "@utils/is-loggedin";
import { useCheckout } from "@contexts/checkout.context";
import { useVerifyCheckoutMutation } from "@data/order/use-checkout-verify.mutation";
import { useCart } from "@contexts/quick-cart/cart.context";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import Button from "@components/ui/button";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";
import OrderInformation from "@components/order/order-information";
import { useOrderStatusesQuery } from "@data/order/use-order-statuses.query";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import Edit from "@components/icons/edit";
import { PlusIcon } from "@components/icons/plus-icon";
import ClickGamePlus from "@components/checkout/click-game-plus.";
import { AnimatePresence } from "framer-motion";
import Loader from "@components/ui/loader/loader";
import Script from "next/script";
import PaymentTigoForm from "@components/money-tigo/payment-tigo-form";
import PaymentForm from "@components/payment/payement-form";
import { Lock } from "@components/icons/lock";
import { formatDateCompletWithDay } from "@utils/format-date";
import { DeliveryIcon } from "@components/icons/DeliveryIcon";
import Tooltip from "@components/ui/tool-tips";
import { InfoIcon } from "@components/icons/info";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { ArrowNext } from "@components/icons/arrow-next";
import CheckoutStep1 from "@components/checkout/checkout_step1";
import CheckoutStep2 from "@components/checkout/checkout_step2";
import CheckoutStep3 from "@components/checkout/checkout_step3";
import CheckoutStep4 from "@components/checkout/checkout_step4";
import { getIcon } from "@utils/get-icon";
import * as listIcon from "@components/icons";
import CheckoutCart from "@components/checkout/checkout_cart";
import { CardBank } from "@components/icons/card-bank";
import storage from "@utils/storage";
const plans = [
  { name: 'Panier', step: 1, icon: ' <img class="w-12" src="/icons/panier.png"/>' },
  //{ name: 'Bonus ClickGames+', step: 2, icon: '<img class="w-16" src="/icons/gif/confetti.gif"/>' },
  { name: 'Adresse de livraison', step: 2, icon: ' <img class="w-16" src="/icons/gif/location-pin-outline.gif"/>' },
  { name: 'Modes de livraison', step: 3, icon: '<img class="w-16" src="/icons/gif/truck-delivery.gif"/>' },
  { name: 'Paiement', step: 4, iconComponentd: <CardBank height="60" />},
]
declare namespace JSX {
  interface IntrinsicElements {
    'lord-icon': any
  }
}
export default function CheckoutPage() {
  const [selected, setSelected] = useState(plans[0])
  const router = useRouter();
  const [processToPay, setProcessToPay] = useState(false);
  const ref = useRef(null);
  const { data, refetch, isLoading } = useCustomerQuery();
  const [clickGamePlus, setClickGamePlus] = useState(true);
  const {
    billing_address,
    shipping_address,
    shipping_class,
    setCheckoutData,
    checkoutData,
    coupon,
    relay_point,
    discount,
    delivery_time,
  } = useCheckout();
  const {
    items,
    total,
    isEmpty,
    totalClickCollectActive,
    totalItems,
    totalClickCollect,v
  } = useCart();
  const { isAuthorize } = useUI();
  const { openModal } = useModalAction();
  const { mutate: verifyCheckout, isLoading: loading } =
    useVerifyCheckoutMutation();
  const { data: orderStatusData } = useOrderStatusesQuery();
  async function handleVerifyCheckout() {
    if (loggedIn()) {
      if (billing_address && shipping_address) {
        verifyCheckout(
          {
            amount: total,
            shipping_class_id: shipping_class,
            products: items?.map((item) =>
              formatOrderedProduct(item, clickGamePlus)
            ),
            billing_address: {
              ...billing_address,
            },
            shipping_address: {
              ...shipping_address,
            },
          },
          {
            onSuccess: (data) => {
              setCheckoutData(data);
            },
            onError: (error) => {
              console.log(error, "error");
            },
          }
        );
      }
      if (shipping_class === 3) {
        if (!relay_point) {
          openModal("DELIVERY_RELAY_POINT");
        }
      }
    }
  }
  if(isEmpty){
    router.push("/");
  }
  useEffect(() => {
 handleVerifyCheckout();
  }, [
    billing_address,
    shipping_address,
    shipping_class,
    totalClickCollectActive,
  ]);

  const available_items = items?.filter(
    (item: any) => !checkoutData?.unavailable_products?.includes(item.id)
  );
  const subtotal = calculateTotal(available_items);
  const totalF = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: checkoutData?.total_tax!,
      shipping_charge: checkoutData?.shipping_charge!,
    },
    discount
  );
  useEffect(() => {
    if (!isAuthorize) {
      storage.set({key:"redirect",value:"/checkout"});
      router.push("/login");
      //return openModal("LOGIN_VIEW");
    }
    if (isAuthorize) {
      refetch();
    }
  }, [isAuthorize]);
  const dataCreateOrder = () => {
    return {
      orderInput: {
        status: orderStatusData?.order_statuses?.data[0]?.id ?? 1,
        amount: subtotal - checkoutData?.total_tax,
        coupon_id: coupon?.id,
        discount: discount ?? 0,
        paid_total: totalF,
        total,
        sales_tax: checkoutData?.total_tax,
        delivery_fee: checkoutData?.shipping_charge,
        delivery_time: delivery_time?.description,
        shipping_class_id: shipping_class,
        relay_point: relay_point,
        customer_contact: billing_address?.telephone,
        billing_address: {
          title: billing_address?.title,
          first_name: billing_address?.first_name,
          last_name: billing_address?.last_name,
          telephone: billing_address?.telephone,
          address: billing_address?.address && billing_address.address,
        },
        shipping_address: {
          title: shipping_address?.title,
          first_name: billing_address?.first_name,
          last_name: billing_address?.last_name,
          telephone: billing_address?.telephone,
          address: shipping_address?.address && shipping_address.address,
        },
      },
      products: available_items?.map((item) =>
        formatOrderedProduct(item, clickGamePlus)
      ),
    };
  };

  const onPaySuccess = (data: any) => {
    const ReactPixel = require("react-facebook-pixel").default;
    ReactPixel.trackSingle(
      `${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}`,
      "Purchase",
      { currency: "EUR", value: total }
    );
    router.push(`${ROUTES.ORDERS}/${data.orderInput.ref}`);
  };

  const showPay = () => {
    if (billing_address && shipping_address && shipping_class) {
      if (totalClickCollect > 0 && totalClickCollectActive === totalItems) {
        return true;
      }
      if (shipping_class === 3 && !relay_point) {
        return false;
      }
      return true;
    }
    return false;
  };
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
  useEffect(() => {
    if (window) {
      if (processToPay) {
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // for smoothly scrolling
        });
      }
    }

  }, [processToPay])
  const isFullClickCollect =
    totalItems > 0 && totalItems === totalClickCollectActive;
  if (isLoading) {
    return <Loader />;
  }
  if(!isAuthorize){
    return <Loader />
  }
  return (
    <div className="py-8 px-2 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20" >
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 md:col-span-1"> <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-4">
            {plans.map((plan) => (
              <RadioGroup.Option
                disabled={true}
                key={plan.name}
                value={plan}

                className={({ checked, active }) =>
                  classNames(
                    checked ? 'border-transparent border-accent' : 'border-gray-300  hidden md:flex',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer   flex justify-between focus:outline-none'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label as="p" className="font-medium text-gray-900  ">
                          Étape {plan.step}
                        </RadioGroup.Label>
                        <RadioGroup.Description as="div" className=" font-bold text-lg  text-accent  ">
                          <p className="sm:inline ">
                            {plan.name}
                          </p>{' '}
                        </RadioGroup.Description>
                      </div>

                    </div>
                    <RadioGroup.Description as="div" className="">
                      {plan?.icon ? <div
                        dangerouslySetInnerHTML={{ __html: plan.icon }}
                      /> : plan.iconComponentd}

                    </RadioGroup.Description>
                    <div
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'absolute -inset-px rounded-lg pointer-events-none'
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup></div>
        <div className="col-span-4 md:col-span-3 bg-white p-1 md:p-4 rounded">
          {selected?.step == 1 && <CheckoutCart setStep={(e: number) => setSelected(plans[e])} setClickGamePlus={setClickGamePlus} />}
          {/*selected?.step == -10 && <CheckoutStep1 setStep={(e: number) => setSelected(plans[e])} setClickGamePlus={setClickGamePlus} />*/}
          {selected?.step == 2 && <CheckoutStep2 setStep={(e: number) => setSelected(plans[e])} me={data?.me} />}
          {selected?.step == 3 && <CheckoutStep3 setStep={(e: number) => setSelected(plans[e])} me={data?.me} shipping_class={shipping_class} />}
          {selected?.step == 4 && <CheckoutStep4 setStep={(e: number) => setSelected(plans[e])} me={data?.me} shipping_class={shipping_class} clickGamePlus={clickGamePlus} dataCreateOrder={dataCreateOrder} onPaySuccess={onPaySuccess} />}
        </div>
      </div>
      <Script src="https://cdn.lordicon.com/xdjxvujz.js" />
    </div>
  );
}
CheckoutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
