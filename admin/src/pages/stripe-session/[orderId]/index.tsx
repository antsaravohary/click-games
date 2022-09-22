import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
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
import { Attachment } from "@ts-types/generated";
import { useOrderQuery } from "@data/order/use-order.query";
import { useUpdateOrderMutation } from "@data/order/use-order-update.mutation";
import { useOrderStatusesQuery } from "@data/order-status/use-order-statuses.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SelectInput from "@components/ui/select-input";
import { useIsRTL } from "@utils/locals";
import { PlusIcon } from "@components/icons/plus-icon";
import TrackingNumberForm from "@components/order/tracking-number-form";
import RelayPointCard from "@components/common/relay-point-card";
import { getProductName } from "@utils/get-product-name";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderInfoPdf from "@components/order/order-info-pdf";
import InvoicePdf from "@components/order/invoice-pdf";
import { useArticlesQuery } from "@data/article/use-articles.query";
import { useTransactionsQuery } from "@data/transaction/use-transactions.query";

type FormValues = {
  order_status: any;
};
export default function OrderDetailsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { alignLeft, alignRight } = useIsRTL();

  const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation();
  const { data: orderStatusData } = useOrderStatusesQuery({});
  const {
    data,
    isLoading: loading,
    error,
  } = useOrderQuery(query.orderId as string);

  const {
    data:dataT,
    isLoading:tloading
  } = useTransactionsQuery({ type: "CGP_PAID",user_id:data?.order?.customer_id,object:"Activation" });
  const {data:dataA,isLoading:loadingA}=useArticlesQuery({limit:100,orderBy:"id" ,sortedBy:"asc"});

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { order_status: data?.order?.status?.id ?? "" },
  });

  const ChangeStatus = ({ order_status }: FormValues) => {
    updateOrder({
      variables: {
        id: data?.order?.id as string,
        input: {
          status: order_status?.id as string,
        },
      },
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
  
  if (loading||tloading||loadingA) return <Loader text={t("common:text-loading")} />;
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
          <span className="font-semibold text-heading">
            {item.pivot.order_quantity}
          </span>
        </div>
      ),
    },
    {
      title: t("table:table-item-total"),
      dataIndex: "price",
      key: "price",
      align: alignRight,
      render: (_: any, item: any) => {
        const { price } = usePrice({
          amount: parseFloat(item.pivot.subtotal),
        });
        return <span>{price}</span>;
      },
    },
  ];
  return (
    <Card>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="flex flex-col justify-content-start">
          <h3 className=" font-semibold text-heading text-start flex-1  w-full lg:w-1/3 mb-2 lg:mb-0 whitespace-nowrap">
            {t("form:input-label-order-id")} - {data?.order?.ref}
          </h3>
          {data?.order.ref === null ? (
            <TrackingNumberForm order={data?.order} />
          ) : (
            <>
              {data?.order && (
                <h3 className=" font-semibold text-heading text-start flex-1  w-full lg:w-1/3 mb-2 lg:mb-0 whitespace-nowrap">
                  Numero de suvie de colis - {data?.order?.tracking_number}
                </h3>
              )}
            </>
          )}
          <div className="w-full border border-200 mt-2 rounded p-4">
            <h3 className="text-heading text-start font-semibold mb-3">
              {data?.order?.relay_point
                ? "Livraison en point de relais"
                : t("common:shipping-address")}
            </h3>

            <div className="card">
              <span>{data?.order?.customer?.name} </span>
              {data?.order?.relay_point ? (
                <>
                  <RelayPointCard data={data?.order?.relay_point} />
                </>
              ) : (
                <div className="flex flex-col">
                  {data?.order?.shipping_address && (
                    <span>
                      {formatAddress(data.order.shipping_address.address)}
                    </span>
                  )}
                  {data?.order?.customer_contact && (
                    <span>{data?.order?.customer_contact}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(ChangeStatus)}
          className="flex items-start ms-auto w-full lg:w-2/4"
        >
          <div className="w-full me-5 z-20">
            <SelectInput
              name="order_status"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={orderStatusData?.order_statuses?.data}
              placeholder={t("form:input-placeholder-order-status")}
            />

            <ValidationError message={t(errors?.order_status?.message)} />
          </div>
          <Button loading={updating}>
            <span className="hidden sm:block">
              {t("form:button-label-change-status")}
            </span>
            <span className="block sm:hidden">
              {t("form:form:button-label-change")}
            </span>
          </Button>
        </form>
      </div>

      <div className="my-5 lg:my-10 flex justify-center items-center">
        <ProgressBox
          data={orderStatusData?.order_statuses?.data}
          status={data?.order?.status?.serial!}
          type={data?.order?.canceled ? 2 : 0}
        />
      </div>

      <div className="mb-10">
        {data?.order ? (
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={t("table:empty-table-data")}
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
          {/**
           * <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-tax")}</span>
            <span>{sales_tax}</span>
          </div>
           * 
           */}
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-delivery-fee")}</span>
            <span>{delivery_fee}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-discount")}</span>
            <span>{discount}</span>
          </div>
          <div className="flex items-center justify-between text-base text-heading font-semibold">
            <span>{t("common:order-total")}</span>
            <span>{total}</span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {data?.order && (
          <PDFDownloadLink
            document={ <OrderInfoPdf order={data?.order} s_transaction={dataT.transactions?.data[0]} articles={dataA?.articles?.data}/>}
            fileName={`${data?.order?.ref}`}
          >
            {({ loading }: any) =>
              loading ? t("common:text-loading") : t("common:text-download")+" le preuve"
            }
          </PDFDownloadLink>
        )}
      </div>
      {/*
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
            {data?.order?.relay_point
              ? "Livraison en point de relais"
              : t("common:shipping-address")}
          </h3>

          <div className="text-sm text-body text-start sm:text-end flex flex-col items-start sm:items-end space-y-1">
            <span>{data?.order?.customer?.name} </span>
            {data?.order?.relay_point ? (
              <>
                    
             
                <RelayPointCard data={data?.order?.relay_point} />
              </>
            ) : (
              <>
            
                {data?.order?.shipping_address && (
                  <span>{formatAddress(data.order.shipping_address)}</span>
                )}
                {data?.order?.customer_contact && (
                  <span>{data?.order?.customer_contact}</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>*/}
    </Card>
  );
}
OrderDetailsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form", "table"])),
  },
});
