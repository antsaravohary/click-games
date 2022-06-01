import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SEO } from "@components/seo";
import { useRepairQuery } from "@data/repair/use-repair.query";
import Card from "@components/common/card";
import DeliveryCard from "@components/common/delivery-card";
import { formatToPrice } from "@utils/use-price";
import RepairActionColisReceive from "@components/repair/repair-action-colis-receive";
import RepairProgress from "@components/repair/repair-progess";
import RepairActionFixing from "@components/repair/repair-action-fixing";
import Button from "@components/ui/button";
import RepairItems from "@components/repair/repair-items";
import { useState } from "react";
import RepairActionConfirmDevis from "@components/repair/repair-action-confirm-devis";
import RepairActionFixed from "@components/repair/repair-action-fixed";
import RepairActionReturnBackColis from "@components/repair/repair-action-return_back-colis";

export default function UpdateProductPage() {
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useRepairQuery(query.repairId as string);

  if (loading) return <Loader text={t("common:text-loading")} />;

  if (error) return <ErrorMessage message={error?.message as string} />;
  const delivery:any=data?.repair?.return_delivery?data?.repair?.return_delivery:data?.repair?.send_delivery;
  return (
    <>
      <SEO title="Modification d'un repair" />
      <Card>
        <div className="flex flex-col justify-content-start mb-10">
          <h3 className=" font-semibold text-heading text-start flex-1  w-full lg:w-1/3 mb-2 lg:mb-0 whitespace-nowrap">
            {t("form:input-label-order-id")} - {data?.repair?.ref}
          </h3>
          <RepairProgress status={data?.repair?.status} />
          <DeliveryCard delivery={delivery} />
        </div>
        <div className="mb-10">
          {data?.repair?.status == "send_dispached" && (
            <RepairActionColisReceive id={data?.repair?.id} />
          )}
          {data?.repair?.status == "paid" && (
            <RepairActionFixing id={data?.repair?.id} />
          )}
          {data?.repair?.status == "fixing" && (
            <RepairActionFixed id={data?.repair?.id} />
          )}
          {data?.repair?.status == "fixed" && (
            <RepairActionReturnBackColis id={data?.repair?.id} />
          )}
          {data?.repair?.status == "checking" && !edit && (
            <RepairActionConfirmDevis
              id={data?.repair?.id}
              edit={() => setEdit(true)}
            />
          )}
        </div>
        <div className="mb-10">
          {/** <Table
            //@ts-ignore

            columns={columns}
            emptyText={t("Aucun element à  reparé")}
            data={data?.repair?.items}
            rowKey="id"
            scroll={{ x: 300 }}
          />*/}
          {data?.repair && (
            <RepairItems repair={data?.repair} edit={edit} setEdit={setEdit} />
          )}
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
