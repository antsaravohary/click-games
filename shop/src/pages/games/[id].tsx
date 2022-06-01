/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import Button from "@components/ui/button";
import Chat from "@components/chat/chat";
import ChatItem from "@components/chat/chat-item";
import SendMessage from "@components/chat/send-message";
import PriceView from "@components/common/price-view";
import AccountLayout from "@components/layout/account-layout";
import Loader from "@components/ui/loader/loader";
import { useModalAction } from "@components/ui/modal/modal.context";
import { usePurchaseQuery } from "@data/purchase-game/use-purchase.query";
import { useCustomerQuery } from "@data/subscription/use-customer.query";
import { Disclosure } from "@headlessui/react";
import { status_purchase } from "@utils/data";
import { parseContextCookie } from "@utils/parse-cookie";
import classNames from "classnames";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { usePurchasesQuery } from "@data/purchase-game/use-purchases.query";
import { useUpdatePurchaseGameMutation } from "@data/purchase-game/use-update-purchase-game.mutation";
import DeliveryInfo from "@components/delivery/delivery-info";

const subtotal = "$108.00";
const discount = { code: "CHEAPSKATE", amount: "$16.00" };
const taxes = "$9.92";
const shipping = "$8.00";
const total = "$141.92";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "forms"])),
    },
  };
};
export default function PageSaleDetail() {
  const router = useRouter();
  const { data, isLoading } = usePurchaseQuery({
    id: router.query.id as string,
  });
  const {mutate}=useUpdatePurchaseGameMutation();
  const { data: dataMe } = useCustomerQuery();
  if (!data && isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  const { openModal } = useModalAction();
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <main className=" lg:flex lg:flex-row-reverse">
        <h1 className="sr-only">Vente</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby="order-heading"
          className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
        >
          <Disclosure as="div" className="max-w-lg mx-auto">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between">
                  <h2
                    id="order-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Mes ventes
                  </h2>
                  <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                    {open ? <span>Voir tous</span> : <span>caché</span>}
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-gray-200"
                  >
                    {data?.purchase?.products.map((product) => (
                      <li key={product.id} className="flex py-6 space-x-6">
                        <img
                          src={product.gallery[0].thumbnail}
                          alt={product.name}
                          className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                        />
                        <div className="flex flex-col justify-between space-y-4">
                          <div className="text-sm font-medium space-y-1">
                            <h3 className="text-gray-900">{product.name}</h3>
                            <p className="text-gray-900">
                              Prix: <PriceView amount={product.price} />
                            </p>
                            <p className="text-gray-500">
                              Quantité: {product.quantity}
                            </p>
                            <p className="text-gray-500">
                              Prix: <PriceView amount={product.total_price} />
                            </p>
                          </div>
                          <div className="flex space-x-4">
                            <button
                              type="button"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Edit
                            </button>
                            <div className="flex border-l border-gray-300 pl-4">
                              <button
                                type="button"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

        
                </Disclosure.Panel>

                <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
                  <span className="text-base">Total</span>
                  <span className="text-base"><PriceView amount={data?.purchase?.total}/></span>
                </p>
              </>
            )}
          </Disclosure>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex"
        >
          <h2 id="summary-heading" className="sr-only">
            Mes produits
          </h2>

          <ul
            role="list"
            className="flex-auto overflow-y-auto max-h-md divide-y divide-gray-200 px-6"
          >
            {data?.purchase?.products.map((product) => (
              <li key={product.id} className="flex py-6 space-x-6">
                <img
                  src={product.gallery[0].thumbnail}
                  alt={product.name}
                  className="flex-none w-20 h-20 object-center object-cover bg-gray-200 rounded-md"
                />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="text-sm font-medium space-y-1">
                    <h3 className="text-gray-900">{product.name}</h3>
                    <p className="text-gray-500">
                      Prix: <PriceView amount={product.price} />
                    </p>
                    <p className="text-gray-500">
                      Quantité: {product.quantity}
                    </p>
                    <p className="text-gray-500">
                      Total: <PriceView amount={product.total_price} />
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        openModal("PURCHASE_PRODUCT_DETAIL_MODAL", { product });
                      }}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Detail
                    </button>
                    <div className="flex border-l border-gray-300 pl-4 hidden">
                      <button
                        type="button"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none bg-gray-50 px-4 pb-4 border-gray-200">
            <dl className="text-sm font-medium text-gray-500  space-y-2">
              <div className="flex justify-between">
                <dt></dt>
                <dd className="text-gray-900"></dd>
              </div>
              <div className="flex justify-between">
                <dt></dt>
                <dd className="text-gray-900"></dd>
              </div>
              <div className="flex justify-between">
                <dt></dt>
                <dd className="text-gray-900"></dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt>Total</dt>
                <dd className="text-base"><PriceView amount={data?.purchase?.total}/></dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section className="flex-auto  pt-2 md:pt-12 pb-0 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0">
          <div className="bg-white my-2">
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
              <h4 className="sr-only">Status</h4>
              <p className="text-sm font-medium text-gray-900">
                {status_purchase[data?.purchase?.status]?.text}
              </p>
              <div className="mt-6" aria-hidden="true">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{
                      width: `${
                        (status_purchase[data?.purchase?.status].value * 100) /
                        status_purchase.total
                      }%`,
                    }}
                  />
                </div>
                <div className="hidden hidden grid-cols-8 text-sm font-medium text-gray-600 mt-6">
                  <div className="text-indigo-600">Order placed</div>
                  <div
                    className={classNames(
                      1 > 0 ? "text-indigo-600" : "",
                      "text-center"
                    )}
                  >
                    Processing
                  </div>
                  <div
                    className={classNames(
                      1 > 1 ? "text-indigo-600" : "",
                      "text-center"
                    )}
                  >
                    Shipped
                  </div>
                  <div
                    className={classNames(
                      1 > 2 ? "text-indigo-600" : "",
                      "text-right"
                    )}
                  >
                    Delivered
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="action flex justify-start my-4 bg-white p-2">
            {data?.purchase?.status === "confirmed" && <Button onClick={()=>openModal("DELIVERY_FORM",{onValide:(e)=>{
              mutate({id:data?.purchase?.id,input:{
                action:"shipping",
                shipping_data: e,
              }})
            }})}>Expedié</Button>}
             {data?.purchase?.status === "dispatched"&&
             <DeliveryInfo 
             company={data?.purchase?.shipping_company}
             tracking_number={data?.purchase?.tracking_number}
             address={data?.purchase?.address}
             />
             }
          </div>
          <Chat messages={data?.purchase?.messages} purchase_id={data?.purchase?.id} user={dataMe.me} />
        </section>
      </main>
    </>
  );
}

PageSaleDetail.Layout = AccountLayout;
