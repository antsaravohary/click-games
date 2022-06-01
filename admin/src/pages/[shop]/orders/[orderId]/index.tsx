import Card from "@components/common/card";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ProgressBox from "@components/ui/progress-box/progress-box";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import Loader from "@components/ui/loader/loader";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SelectInput from "@components/ui/select-input";
import ShopLayout from "@components/layouts/shop";
import { useIsRTL } from "@utils/locals";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { useUpdateOrderMutation } from "@data/order/use-order-update.mutation";
import { useOrderStatusesQuery } from "@data/order-status/use-order-statuses.query";
import { useOrderQuery } from "@data/order/use-order.query";
import { Attachment } from "@ts-types/generated";
import { useModalAction } from "@components/ui/modal/modal.context";
import Badge from "@components/ui/badge/badge";
import { getProductName } from "@utils/get-product-name";
import RelayPointCard from "@components/common/relay-point-card";
import { SEO } from "@components/seo";
import ButtonValidClickCollect from "@components/order/button-valid-click-collect";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ShippingLabelPdf from "@components/order/shipping-label-pdf";
import LinkButton from "@components/ui/link-button";
import { API_ENDPOINTS } from "@utils/api/endpoints";

type FormValues = {
  order_status: any;
};
export default function OrderDetailsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { alignLeft, alignRight } = useIsRTL();
  const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation();
  const { data: orderStatusData } = useOrderStatusesQuery({
    limit: 10,
  });
  const { openModal } = useModalAction();
  const {
    data,
    isLoading: loading,
    error,
  } = useOrderQuery(query.orderId as string);

  const ChangeStatus = (serial: number) => {
    const order_status = orderStatusData?.order_statuses?.data.find(
      (o: { serial: number }) => o.serial === serial
    );
    updateOrder({
      variables: {
        id: data?.order?.id as string,
        input: {
          status: order_status?.id as string,
        },
      },
    });
  };
  const confirmOrder = () => {
    const order_status = orderStatusData?.order_statuses?.data.find(
      (o: { serial: number }) => o.serial === 3
    );
    openModal("DELIVERY_FORM", {
      order: data?.order,
      orderStatus: order_status,
    });
  };
  const { price: subtotal } = usePrice(
    data && {
      amount: data?.order?.amount!,
    }
  );
  const { price: total } = usePrice(
    data && {
      amount: data?.order?.paid_total!,
    }
  );
  const { price: discount } = usePrice(
    data && {
      amount: data?.order?.discount!,
    }
  );
  const { price: delivery_fee } = usePrice(
    data && {
      amount: data?.order?.delivery_fee!,
    }
  );
  const { price: sales_tax } = usePrice(
    data && {
      amount: data?.order?.sales_tax!,
    }
  );
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  const columns = [
    {
      dataIndex: "image",
      key: "image",
      width: 70,
      render: (image: Attachment) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="alt text"
          layout="fixed"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: t("table:table-item-products"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      render: (name: string, item: any) => (
        <div>
          <span>{getProductName(item)}</span>
          <span className="mx-2">x</span>
          <span className="font-semibold text-heading mr-2">
            {item.pivot.order_quantity}
          </span>
          {!!item.pivot.click_collect && <Badge text="Click&Collect" />}
          {!!item.pivot.code_click_collect &&
            item.pivot.status !== "delivered" && (
              <Badge
                className="ml-1"
                text="En attente de retrait"
                color="bg-yellow-600"
              />
            )}
          {item.pivot.status === "delivered" && (
            <Badge className="ml-1" text="Delivrée" color="bg-green-500" />
          )}
        </div>
      ),
    },
    {
      title: t("table:table-item-total"),
      dataIndex: "pivot",
      key: "pivot",
      align: alignRight,
      render: (pivot: any) => {
        const { price } = usePrice({
          amount: Number(pivot?.subtotal),
        });
        return <span>{price}</span>;
      },
    },
  ];
  console.log("data", data);
  return (
    <>
      <SEO
        title={
          "Commande-" + data?.order?.ref + " " + data?.order?.products[0].name
        }
      />
      <Card>
        <div className="flex flex-col justify-between lg:flex-row items-center">
          <div>
            <h3 className="text-2xl font-semibold text-heading text-center lg:text-start w-full lg:w-1/3 mb-8 lg:mb-0 whitespace-nowrap">
              {t("form:input-label-order-id")} - {data?.order?.ref}
            </h3>
            {(data?.order?.status?.serial as number) > 2 && (
              <div>
                {data?.order?.tracking_number && (
                  <h4 className="text-1xl font-semibold text-heading text-center lg:text-start w-full lg:w-1/3 mb-8 lg:mb-0 whitespace-nowrap">
                    Numero de suvie de commande: {data?.order?.tracking_number}
                  </h4>
                )}
                {data?.order?.tracking_number && (
                  <h4 className="text-1xl font-semibold text-heading text-center lg:text-start w-full lg:w-1/3 mb-8 lg:mb-0 whitespace-nowrap">
                    Nom de la société transporteur:{" "}
                    {data?.order?.shipping_company}
                  </h4>
                )}
                {data?.order?.code_click_collect && (
                  <h4 className="text-1xl font-semibold text-heading text-center mt-2 lg:text-start w-full lg:w-1/3 mb-8 lg:mb-0 whitespace-nowrap">
                    CODE RETRAIT CLICK&COLLECT:{" "}
                    {data?.order?.code_click_collect}
                  </h4>
                )}
              </div>
            )}
            <div className="w-full border border-200 mt-2 rounded p-4">
              <h3 className="text-heading text-start font-semibold mb-3">
                {data?.order?.relay_point
                  ? "Livraison en point de relais"
                  : data?.order?.mode_click_collect === "full"
                    ? "Livraison Click&Collect"
                    : t("common:shipping-address")}
              </h3>
              {data?.order?.mode_click_collect !== "full" ? (
                <div className="card">
                  {data?.order?.relay_point ? (
                    <>
                      <RelayPointCard
                        customer={data?.order?.customer}
                        data={data?.order?.relay_point}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col max-w-xs">
                      {data?.order?.shipping_address && (
                        <>
                          <span>{data?.order?.shipping_address?.title},</span>
                          <span>
                            {formatAddress(data.order.shipping_address.address)}
                          </span>
                        </>
                      )}
                      {data?.order?.customer_contact && (
                        <span>{data?.order?.customer_contact}</span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div>{/*formatAddress(data.order?.shop?.address)*/}</div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            {data?.order?.mode_click_collect !== "full" && (
              <div className="flex sm:mt-2">
                {data?.order.status.serial === 1 && (
                  <Button onClick={() => ChangeStatus(2)} loading={updating}>
                    <span className="block">Confirmer la commande</span>
                  </Button>
                )}
                {data?.order.status.serial === 1 && (
                  <Button
                    className="bg-red-500 hover:bg-red-600 ml-2"
                    onClick={() =>
                      openModal("REFUND_FORM", { order: data?.order })
                    }
                    disabled={updating}
                  >
                    <span className="block">Annuler</span>
                  </Button>
                )}
                {data?.order.status.serial === 2 && (
                  <Button onClick={() => confirmOrder()} loading={updating}>
                    <span className="block">{data?.order?.generate_label != true ? "Preparation de livraison" : "Expedier la commande"}</span>
                  </Button>
                )}
                {data?.order.status.serial===2&&data?.order?.generate_label&&<LinkButton className="mx-2" target="_blank" href={process.env.NEXT_PUBLIC_REST_API_ENDPOINT + "/storage/label-colissimo/" + data?.order?.ref+".pdf"}>Etiquette</LinkButton>}
                <>
                  {data?.order.status.serial === 3 && (
                    <div>
                      <LinkButton className="bg-green-500 hover:bg-red-600 mb-2 w-full" target="_blank" href={process.env.NEXT_PUBLIC_REST_API_ENDPOINT + "/storage/label-colissimo/" + data?.order?.ref+".pdf"}>Etiquette</LinkButton>
                      {/* <PDFDownloadLink
                        document={<ShippingLabelPdf order={data?.order} />}
                        fileName={`${data?.order?.ref}`}
                      >
                        {({ loading }: any) =>
                          loading
                            ? t("common:text-loading")
                            : t("common:text-download") + " le preuve"
                        }
                      </PDFDownloadLink>
                      <Button
                        className="bg-green-500 hover:bg-red-600 mb-2 w-full"
                        onClick={() =>
                          openModal("SHIPPING_LABEL", { order: data?.order })
                        }
                      >
                        <span className="block">Étiquette</span>
                      </Button> */}

                      <div className="border p-2 w-96 rounded">
                        <h4>
                          La commande sera livré automatique après 5 jours s'il
                          n'y a pas l'intervation du client
                        </h4>
                      </div>
                    </div>
                  )}
                </>

                
                {/**
          *  <Button loading={updating}>
            <span className="hidden sm:block">
              {t("form:button-label-change-status")}
            </span>
            <span className="block sm:hidden">
              {t("form:form:button-label-change")}
            </span>
          </Button> 
          * 
          */}
              </div>
            )}
            {data?.order?.mode_click_collect !== "none" &&
              data?.order?.code_click_collect === null && (
                <ButtonValidClickCollect order={data?.order} />
              )}
          </div>
        </div>

        <div className="my-5 lg:my-10 flex justify-center items-center">
          <ProgressBox
            data={orderStatusData?.order_statuses?.data.map((status: any) => {
              if (status.serial === 3) {
                if (data?.order?.mode_click_collect === "full") {
                  return { ...status, name: "Commande en attente de retrait" };
                } else if (data?.order?.relay_point) {
                  return {
                    ...status,
                    name: "Commande traité par Mondial Relay",
                  };
                }
              }
              if (
                status?.serial === 4 &&
                data?.order?.mode_click_collect === "full"
              ) {
                return { ...status, name: "Commande retiré" };
              }
              return status;
            })}
            status={data?.order?.status?.serial!}
            type={data?.order?.canceled ? 2 : 1}
          />
        </div>

        <div className="mb-10">
          {data?.order ? (
            <Table
              //@ts-ignore
              columns={columns}
              emptyText={t("table:empty-table-data")}
              //@ts-ignore
              data={data?.order?.products!}
              rowKey="id"
              scroll={{ x: 300 }}
            />
          ) : (
            <span>{t("common:no-order-found")}</span>
          )}

          <div className="border-t-4 border-double border-border-200 flex flex-col w-full sm:w-1/2 md:w-1/3 ms-auto px-4 py-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-body">
              <span>{t("common:order-sub-total")}</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-body">
              <span>{t("common:order-tax")}</span>
              <span>{sales_tax}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-body">
              <span>{t("common:order-delivery-fee")}</span>
              <span>{delivery_fee}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-body">
              <span>{t("common:order-discount")}</span>
              <span>{discount}</span>
            </div>
            <div className="flex items-center justify-between text-body font-semibold">
              <span>{t("common:order-total")}</span>
              <span>{total}</span>
            </div>
          </div>
        </div>
        {/** 
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full sm:w-1/2 sm:pe-8 mb-10 sm:mb-0">
          <h3 className="text-heading font-semibold mb-3 pb-2 border-b border-border-200">
            {t("common:billing-address")}
          </h3>

          <div className="text-sm text-body flex flex-col items-start space-y-1">
            <span>{data?.order?.customer?.name}</span>
            {data?.order?.billing_address && (
              <span>{formatAddress(data.order.billing_address.address)}</span>
            )}
            {data?.order?.customer_contact && (
              <span>{data?.order?.customer_contact}</span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-1/2 sm:ps-8">
          <h3 className="text-heading text-start font-semibold sm:text-end mb-3 pb-2 border-b border-border-200">
            {t("common:shipping-address")}
          </h3>

          <div className="text-sm text-body text-start sm:text-end flex flex-col items-start sm:items-end space-y-1">
            <span>{data?.order?.customer?.name}</span>
            {data?.order?.shipping_address && (
              <span>{formatAddress(data.order.shipping_address.address)}</span>
            )}
            {data?.order?.customer_contact && (
              <span>{data?.order?.customer_contact}</span>
            )}
          </div>
        </div>
      </div>*/}
      </Card>
    </>
  );
}
OrderDetailsPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
OrderDetailsPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form", "table"])),
  },
});
