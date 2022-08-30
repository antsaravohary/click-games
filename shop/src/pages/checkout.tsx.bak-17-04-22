
import Address from "@components/address/address";
import Layout from "@components/layout/layout";
import { useEffect, useState } from "react";
import { useUI } from "@contexts/ui.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useModalAction } from "@components/ui/modal/modal.context";
import ShippingMode from "@components/checkout/shipping-mode";
import PaymentForm from "@components/payment/payement-form";
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
import OrderProductClickCollectList from "@components/order/order-product-click-collect-list";
import ModeClickCollectCard from "@components/common/mode-click-collect-card";
import ClickGamePlus from "@components/checkout/click-game-plus.";
import { AnimatePresence } from "framer-motion";
import Loader from "@components/ui/loader/loader";
import { Lock } from "@components/icons/lock";
import Script from "next/script";
import SecurionPayForm from "@components/securion-pay/securion-pay-form";
import PaymentTigoForm from "@components/money-tigo/payment-tigo-form";

export default function CheckoutPage() {
  const router = useRouter();
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
    totalClickCollect,
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
      return openModal("LOGIN_VIEW");
    }
    if (isAuthorize) {
      refetch();
    }
  }, [isAuthorize]);
  const dataCreateOrder = () => {
    return {
      orderInput: {
        status: orderStatusData?.order_statuses?.data[0]?.id ?? 1,
        amount: subtotal,
        coupon_id: coupon?.id,
        discount: discount ?? 0,
        paid_total: totalF,
        total,
        sales_tax: checkoutData?.total_tax,
        delivery_fee: checkoutData?.shipping_charge,
        delivery_time: delivery_time?.description,
        shipping_class_id: shipping_class,
        relay_point: relay_point,
        billing_address: {
          title: billing_address?.title,
          address: billing_address?.address && billing_address.address,
        },
        shipping_address: {
          title: shipping_address?.title,
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
  const isFullClickCollect =
    totalItems > 0 && totalItems === totalClickCollectActive;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto lg:space-s-8 w-full max-w-5xl">
        <div className="lg:max-w-2xl w-full space-y-6">
          {totalItems > 0 && totalItems === totalClickCollectActive ? null : (
            <div className="shadow-700 bg-light p-5 md:p-8">
              {shipping_class === 3 ? (
                <div>
                  <div className="flex items-center space-s-3 md:space-s-4">
                    <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
                      1
                    </span>
                    <p className="text-lg lg:text-xl text-heading capitalize">
                      Livraison en point relais
                    </p>
                  </div>
                  <ul className="list-unstyled font-size-sm mt-2 border p-4">
                    <li className="text-left">
                      <span className="text-right text-size-md">
                        Information sur le point de relais
                      </span>
                    </li>

                    {relay_point && (
                      <>
                        <li className="text-left">
                          <span className="text-right text-gray-700">
                            Nom du point de relay:&nbsp;{relay_point?.nom}
                          </span>
                        </li>
                        <li className="text-left">
                          <span className=" text-right text-gray-700">
                            Adresse:&nbsp;{relay_point?.address}
                          </span>
                        </li>
                        <li className="text-left">
                          <span className=" text-right text-gray-700">
                            Code postal:&nbsp;{relay_point?.zip}
                          </span>
                        </li>
                      </>
                    )}
                    <div className="flex justify-end -mt-10">
                      <Button
                        size="small"
                        className="mt-2"
                        onClick={() => {
                          openModal("DELIVERY_RELAY_POINT");
                        }}
                      >
                        {relay_point ? (
                          <Edit width="16" height="16" />
                        ) : (
                          <PlusIcon width="16" height="16" />
                        )}
                      </Button>
                    </div>
                  </ul>
                </div>
              ) : (
                <Address
                  id={data?.me?.id!}
                  me={data?.me}
                  heading="text-delivery-address"
                  addresses={data?.me?.address}
                  count={1}
                  type="billing"
                />
              )}
            </div>
          )}
          {/**
           * <Address
              id={data?.me?.id!}
              heading="text-shipping-address"
              addresses={data?.me?.address}
              count={2}
              type="shipping"
            />
           */}
          <div className="shadow-700 bg-light p-5 md:p-8">
            {totalItems > 0 && totalItems === totalClickCollectActive ? (
              <ModeClickCollectCard count={1} />
            ) : (
              <ShippingMode count={2} />
            )}
          </div>
          {totalClickCollect > 0 && (
            <div className="shadow-700 bg-light p-5  md:p-8">
              <OrderProductClickCollectList
                count={isFullClickCollect ? 2 : 3}
              />
            </div>
          )}
          {!data?.me?.subscription?.status && (
            <AnimatePresence>
              <ClickGamePlus
                value={clickGamePlus}
                setValue={setClickGamePlus}
              />
            </AnimatePresence>
          )}

          {showPay() && (
            <>
              <div className=" sm:hidden w-full lg:w-96 mb-10 sm:mb-12 lg:mb-0 mt-10">
                <OrderInformation />
              </div>
              <PaymentTigoForm
                data={{
                  action: "create_order_payment",
                  data: { ...dataCreateOrder(), clickGamePlus },
                }}
                amount={totalF}
              />

              { /*   <SecurionPayForm
                data={{
                  action: "create_order_payment",
                  data: { ...dataCreateOrder(), clickGamePlus },
                }}
                onPaySuccess={onPaySuccess}
                amount={totalF}
              />*/}
              {/**  <div className="pt-8">
                <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
                  <div className="w-full pt-1 pb-5">
                    <div className="bg-accent text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                      <Lock width="48" heigth="48" />
                    </div>
                  </div>
                  <div className="m-8 text-xl text-center text-red-500 ">  Les paiements sont temporairement suspendu</div>
                </div>
              </div>*/}
              {/**  
              <PaymentForm
                click_game_plus={
                  clickGamePlus && !data?.me?.subscription?.status
                }
                onPaySuccess={onPaySuccess}
                data={{
                  action: "create_order_payment",
                  data: { ...dataCreateOrder(), clickGamePlus },
                }}
                amount={totalF}
              />   */}
              {/**<div className="shadow-700 bg-light p-5 md:p-8">
              <Elements stripe={stripePromise}>
                  <PaymentGroup
                    onPaySuccess={onPaySuccess}
                    data={{
                      action: "create_order_payment",
                      data: dataCreateOrder(),
                    }}
                    amount={total}
                  />  
              </Elements>
            
            </div>*/}
            </>
          )}
        </div>
        <div className="hidden sm:block w-full lg:w-96 mb-10 sm:mb-12 lg:mb-0 mt-10">
          <OrderInformation />
        </div>
      </div>
      <Script src="https://checkout.moneytigo.com/dist/js/moneytigapp.js" />
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
