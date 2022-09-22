import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SEO } from "@components/seo";
import Card from "@components/common/card";
import { useState } from "react";
import { usePurchaseQuery } from "@data/purchase/use-purchase.query";
import Chat from "@components/chat/chat";
import { useMeQuery } from "@data/user/use-me.query";
import classNames from "classnames";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Disclosure } from "@headlessui/react";
import PriceView from "@components/common/price-view";
import Button from "@components/ui/button";
import { status_purchase } from "@utils/data";
import DeliveryInfo from "@components/delivery/delivery-info";
import PurchaseActionConfirmShipped from "@components/purchase/purchase-action-confirm-shipped";
import PurchaseActionConfirm from "@components/purchase/purchase-action-confirm";

export default function UpdateProductPage() {
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const { query } = useRouter();
  const { data: dataMe } = useMeQuery();
  const { openModal } = useModalAction();
  const {
    data,
    isLoading: loading,
    error,
  } = usePurchaseQuery(query.purchaseId as string);

  if (loading) return <Loader text={t("common:text-loading")} />;

  if (error) return <ErrorMessage message={error?.message as string} />;
  console.log(data);
  return (
    <>
      <SEO title="Achat de console" />

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

                  <form className="mt-10">
                    <label
                      htmlFor="discount-code-mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Discount code
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <input
                        type="text"
                        id="discount-code-mobile"
                        name="discount-code-mobile"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="submit"
                        className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                      >
                        Apply
                      </button>
                    </div>
                  </form>

                  <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="text-gray-900">{50}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="flex">
                        Discount
                        <span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
                          {50}
                        </span>
                      </dt>
                      <dd className="text-gray-900">-{50}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Taxes</dt>
                      <dd className="text-gray-900">{50}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd className="text-gray-900">{50}</dd>
                    </div>
                  </dl>
                </Disclosure.Panel>

                <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
                  <span className="text-base">Total</span>
                  <span className="text-base">{50}</span>
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
                <dd className="text-base">
                  <PriceView amount={data?.purchase?.total} />
                </dd>
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
            {data?.purchase?.status === "dispatched" && (
              <>
                <DeliveryInfo
                  company={data?.purchase?.shipping_company}
                  tracking_number={data?.purchase?.tracking_number}
                  address={data?.purchase?.address}
                />
              </>
            )}
          </div>
          {data?.purchase?.status === "dispatched" && (
            <PurchaseActionConfirmShipped id={data?.purchase?.id} />
          )}
           {data?.purchase?.status === "pending" && (
            <PurchaseActionConfirm id={data?.purchase?.id} purchase={data?.purchase}/>
          )}
          <Chat messages={data?.purchase?.messages} user={dataMe} />
          <div className="mt-2">
            {data?.purchase?.status === "pending" && (
              <Button
                onClick={() => {
                  openModal("PURCHASE_PURPOSE_FORM", { ...data?.purchase });
                }}
              >
                Proposer un offre
              </Button>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
UpdateProductPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
