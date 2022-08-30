import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import Layout from "@components/layout/layout";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import { formatString } from "@utils/format-string";
import { parseContextCookie } from "@utils/parse-cookie";
import { useCheckout } from "@contexts/checkout.context";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useOrderQuery } from "@data/order/use-order.query";
import { ROUTES } from "@utils/routes";
import { useSearch } from "@contexts/search.context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useIsRTL } from "@utils/locals";
import Badge from "@components/ui/badge";
import { CheckMark } from "@components/icons/checkmark";
import { Table } from "@components/ui/table";
import { OrderItems } from "@components/order/order-items-table";
import AddNewTicket from "@components/ticket/add-new-ticket";
import OrderStatus from "@components/order/order-status";
import Button from "@components/ui/button";
import { InfoIcon } from "@components/icons/info";
import Tooltip from "@components/ui/tool-tips";
import { useUpdateOrderMutation } from "@data/order/use-mutation-order.mutation";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ["common"])),
    },
  };
};

export default function OrderPage() {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const { resetCart } = useCart();
  const { clearCheckoutData } = useCheckout();
  const { updateSearchTerm } = useSearch();
  const { alignLeft, alignRight } = useIsRTL();
  const { mutate: updateOrder, isLoading } = useUpdateOrderMutation();

  useEffect(() => {
    resetCart();
    clearCheckoutData();
    updateSearchTerm("");
  }, []);

  const { data, isLoading: loading } = useOrderQuery({
    ref: query.tracking_number as string,
  });

  const { price: total } = usePrice(data && { amount: data.order.paid_total });
  const { price: sub_total } = usePrice(data && { amount: data.order.amount });
  const { price: shipping_charge } = usePrice(
    data && { amount: data?.order?.delivery_fee ?? 0 }
  );
  const { price: tax } = usePrice(
    data && { amount: data?.order?.sales_tax ?? 0 }
  );
  const { price: discount } = usePrice(
    data && { amount: data?.order?.discount ?? 0 }
  );

  const orderTableColumns = [
    {
      title: t("text-tracking-number"),
      dataIndex: "ref",
      key: "ref",
      align: alignLeft,
    },
    {
      title: t("text-date"),
      dataIndex: "date",
      key: "date",
      align: alignLeft,
      render: (created_at: string) => dayjs(created_at).format("MMMM D, YYYY"),
    },
    {
      title: t("text-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: any) => (
        <Badge text={status?.name} style={{ backgroundColor: status?.color }} />
      ),
    },
    {
      title: t("text-item"),
      dataIndex: "products",
      key: "products",
      align: "center",
      render: (products: any) => formatString(products?.length, t("text-item")),
    },
    {
      title: t("text-total-price"),
      dataIndex: "paid_total",
      key: "paid_total",
      align: alignRight,
      // width: 100,
      render: (paid_total: any) => {
        const { price } = usePrice(data && { amount: Number(paid_total) });
        return <p>{price}</p>;
      },
    },
    {
      title: "",
      dataIndex: "ref",
      key: "ref",
      align: alignRight,
      // width: 100,
      render: (ref: string) => (
        <Link
          href={`${ROUTES.ORDERS}/${ref}`}
          className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-gray-700 text-light border border-transparent hover:bg-gray-900 px-4 py-0 h-10 text-sm"
        >
          Detail
        </Link>
      ),
    },
    {
      title: "",
      key: "id",
      align: alignRight,
      // width: 100,
      render: (order: any) => <AddNewTicket order={order} />,
    },
  ];

  if (loading && !data) {
    return <Spinner showText={false} />;
  }
  const my_order =
    data?.order?.children?.length === 1
      ? data?.order?.children[0]
      : data?.order;
  let mode = "standard";
  let address = my_order?.shipping_address?.address;
  let addressTitle = my_order?.shipping_address?.title;
  if (my_order?.relay_point) {
    mode = "relay_point";

    addressTitle = my_order?.relay_point?.nom;
    address = my_order?.relay_point;
    address = { street_address: address?.address, city: address.city };
  } else if (my_order?.mode_click_collect === "full") {
    mode = "click_collect";
    addressTitle = my_order?.shop?.name;
    address = my_order?.shop?.address;
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="p-6 sm:p-8 lg:p-12 max-w-screen-lg w-full mx-auto bg-light rounded border shadow-sm">
        <h2 className="flex flex-col sm:flex-row items-center justify-between text-base font-bold text-heading mb-9 sm:mb-12">
          <span className="mb-5 sm:mb-0 me-auto ">
            <span className="me-4">{t("text-status")} :</span>
            <Badge
              text={data?.order?.status?.name!}
              className="font-normal text-sm whitespace-nowrap"
            />
          </span>

          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center text-accent text-base font-normal underline hover:no-underline hover:text-accent-hover"
          >
            {t("text-back-to-home")}
          </Link>
        </h2>
        <div className="mb-5">

          {my_order?.status?.serial == 3 && <Button loading={isLoading} onClick={() => {
            updateOrder({ id: my_order?.id, input: { action: "packet_received",status:4 } })
          }}>Confirmer la reception de colis</Button>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm text-heading font-semibold">
              {t("text-order-ref")}
            </h3>
            <p className="text-sm text-body-dark">{my_order?.ref}</p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t("text-date")}
            </h3>
            <p className="text-sm text-body-dark">
              {dayjs(data?.order?.created_at).format("MMMM D, YYYY")}
            </p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t("text-total")}
            </h3>
            <p className="text-sm  text-body-dark">{total}</p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              Mode de livraison
            </h3>
            <p className="text-sm text-body-dark">
              {data?.order?.mode_click_collect === "full"
                ? "CLICK&COLLECT"
                : data?.order?.shipping?.name ?? "N/A"}
            </p>
          </div>
          {my_order?.tracking_number && (
            <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
              <h3 className="mb-2 text-sm  text-heading font-semibold">
                Suivi de comande
              </h3>
              <p className="text-sm text-body-dark">
                N°{my_order?.tracking_number}
              </p>
              {data?.order?.tracking_url && (
                <a target="_new_blank" href={data?.order?.tracking_url}>
                  <div className="p-1 border-1 text-sm text-center rounded bg-accent text-white mt-1 w-full">
                    Suivre
                  </div>
                </a>
              )}
            </div>
          )}
          {my_order?.code_click_collect && (
            <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
              <h3 className="mb-2 text-sm  text-heading font-semibold">
                Code de retrait
              </h3>
              <p className="text-sm text-body-dark">
                {my_order?.code_click_collect}
              </p>
            </div>
          )}
        </div>
        {data?.order?.children.length === 1 ||
          (data?.order?.children.length === 0 && (
            <div className="w-full flex justify-center items-center ">
              <OrderStatus
                type={data?.order?.canceled ? 2 : 1}
                status={
                  data?.order?.children.length
                    ? data?.order.children[0]?.status?.serial
                    : data?.order?.status.serial
                }
                mode={
                  data?.order?.relay_point
                    ? "relay_point"
                    : data?.order?.mode_click_collect === "full"
                      ? "click_collect"
                      : "standard"
                }
              />
            </div>
          ))}
        {/* end of order received  */}

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pe-3 mb-12 lg:mb-0">
            <h2 className="text-xl font-bold text-heading mb-6">
              {t("text-total-amount")}
            </h2>

            <div>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-sub-total")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {sub_total}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-shipping-charge")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {shipping_charge}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-tax")}
                </strong>
                :<span className="w-7/12 sm:w-8/12 ps-4 text-sm ">{tax}</span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-discount")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {discount}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-total")}
                </strong>
                :<span className="w-7/12 sm:w-8/12 ps-4 text-sm ">{total}</span>
              </p>
            </div>
          </div>
          {/* end of total amount */}

          <div className="w-full lg:w-1/2 lg:ps-3">
            <h2 className="text-xl font-bold text-heading mb-6">
              {t("text-order-details")}
            </h2>
            <div>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-total-item")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                  {formatString(data?.order?.products?.length, t("text-item"))}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-deliver-time")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm flex">

                  <span className="mr-2">{data?.order?.delivery_time}  </span>  <Tooltip tooltipText={"Les délais de livraison sont indicatifs de certaines commandes, susceptibles d'avoir des délais de livraison plus longs"} children={<InfoIcon height="16" width="16" />} />
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {mode === "standard" && t("text-shipping-address")}
                  {mode === "relay_point" && t("Adresse de point de relais")}
                  {mode === "click_collect" && "Adresse de retrait"}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm flex flex-col">
                  <span>{addressTitle},</span>
                  <span> {formatAddress(address)}</span>
                  {mode === "click_collect" && <span>{my_order?.shop?.settings.contact}</span>}
                  {mode === "relay_point" && <div dangerouslySetInnerHTML={{ __html: my_order?.relay_point.HoursHtmlTable }}>

                  </div>}
                </span>
              </p>
              {data?.order?.mode_click_collect === "partial" && (
                <p className="flex text-body-dark mt-5">
                  <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                    Adresse de retrait
                  </strong>
                  :
                  <span className="w-7/12 sm:w-8/12 ps-4 text-sm flex flex-col">
                    <span>{my_order?.shop?.name},</span>
                    <span> {formatAddress(my_order?.shop?.address)}</span>
                    <span>{my_order?.shop?.settings.contact}</span>
                  </span>
                </p>
              )}
            </div>
          </div>
          {/* end of order details */}
        </div>

        <div className="mt-12">
          <OrderItems products={data?.order?.products} />
        </div>
        {(data?.order?.children?.length === 1 ||
          data?.order?.children.length === 0) && (
            <AddNewTicket
              order={
                data?.order?.children?.length === 1
                  ? data?.order?.children[0]
                  : data?.order
              }
            />
          )}
        {data?.order?.children?.length ? (
          <div>
            {data?.order?.children.length > 1 && (
              <h2 className="text-xl font-bold text-heading mt-12 mb-6">
                {t("text-sub-orders")}
              </h2>
            )}

            <div>
              {data?.order?.children.length !== 1 && (
                <div className="flex items-start border border-gray-700 rounded p-4 mb-12">
                  <span className="w-4 h-4 px-2 rounded-sm bg-dark flex items-center justify-center me-3 mt-0.5">
                    <CheckMark className="w-2 h-2 text-light flex-shrink-0" />
                  </span>
                  <p className="text-heading text-sm">
                    <span className="font-bold">{t("text-note")}:</span>{" "}
                    {t("message-sub-order")}
                  </p>
                </div>
              )}

              {Array.isArray(data?.order?.children) &&
                data?.order?.children.length > 1 && (
                  <div className="">
                    <Table
                      //@ts-ignore
                      columns={orderTableColumns}
                      emptyText={t("table:empty-table-data")}
                      //@ts-ignore
                      data={data?.order?.children}
                      rowKey="id"
                      scroll={{ x: 800 }}
                    />
                  </div>
                )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

OrderPage.Layout = Layout;
