import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SEO } from "@components/seo";
import Card from "@components/common/card";
import DeliveryCard from "@components/common/delivery-card";
import { useState } from "react";
import { useExchangeQuery } from "@data/exchange/use-exchange.query";
import ExchangeProgress from "@components/exchange/exchange-progess";
import ExchangeCompare from "@components/exchange/exchange-compare";
import ExchangeActionValidate from "@components/exchange/exchange-action-validate";
import ExchangeActionReceive from "@components/exchange/exchange-action-received";
import ExchangeActionChecked from "@components/exchange/exchange-action-checked";
import ExchangeActionReturnBackColis from "@components/exchange/exchange-action-return_back-colis";
export default function UpdateProductPage() {
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useExchangeQuery(query.exchangeId as string);
  const delivery: any = data?.exchange?.return_delivery ? data?.exchange?.return_delivery : data?.exchange?.send_delivery;
  if (loading) return <Loader text={t("common:text-loading")} />;

  if (error) return <ErrorMessage message={error?.message as string} />;

  return (
    <>
      <SEO title="Modification d'un exchange" />
      <Card>
        <div className="flex flex-col justify-content-start mb-10">
          <h3 className=" font-semibold text-heading text-start flex-1  w-full lg:w-1/3 mb-2 lg:mb-0 whitespace-nowrap">
            {t("form:input-label-order-id")} - {data?.exchange?.ref}
          </h3>
          <ExchangeProgress status={data?.exchange?.status} />
          <DeliveryCard delivery={delivery} />
        </div>
        <div className="mb-10">
          <ExchangeCompare products={[data?.exchange?.shop_product, data?.exchange?.customer_product?.product]} />
        </div>
        <div className="mb-10">
          {data?.exchange?.status === "pending" && <ExchangeActionValidate id={data?.exchange?.id} price={data?.exchange?.amount} />}
          {data?.exchange?.status === "send_dispached" && <ExchangeActionReceive id={data?.exchange?.id} />}
          {data?.exchange?.status === "checking" && <ExchangeActionChecked id={data?.exchange?.id} />}
          {data?.exchange?.status === "paid" && <ExchangeActionReturnBackColis exchange={data?.exchange} />}
        </div>
      </Card>
    </>
  );
}
UpdateProductPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
