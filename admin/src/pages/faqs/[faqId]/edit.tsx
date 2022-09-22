import Layout from "@components/layouts/admin";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateFaqForm from "@components/faq/faq-form";
import { adminOnly } from "@utils/auth-utils";
import { useFaqQuery } from "@data/faq/use-faq.query";

export default function UpdateTagPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useFaqQuery(query.faqId as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
        Modification
        </h1>
      </div>

      <CreateOrUpdateFaqForm initialValues={data?.faq} />
    </>
  );
}
UpdateTagPage.authenticate = {
  permissions: adminOnly,
};
UpdateTagPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
