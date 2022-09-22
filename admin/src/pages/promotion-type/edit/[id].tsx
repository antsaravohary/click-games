import Layout from "@components/layouts/admin";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { usePromotionTypeQuery } from "@data/promotion-type/use-promotion-type.query";
import CreateOrUpdatePromotionTypeForm from "@components/promotoin-type/promotion-type-form";

export default function UpdatePromotionTypePage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = usePromotionTypeQuery(query.id as string);

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          Modifier une promotion type
        </h1>
      </div>

      <CreateOrUpdatePromotionTypeForm initialValues={data} />
    </>
  );
}

UpdatePromotionTypePage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
