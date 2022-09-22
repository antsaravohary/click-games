import Layout from "@components/layouts/admin";
import { SEO } from "@components/seo";
import CustomerCreateForm from "@components/user/user-form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CreateCustomerPage() {
  const { t } = useTranslation();
  return (
    <>
    <SEO title="Utilisateur"/>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-customer")}
        </h1>
      </div>
      <CustomerCreateForm />
    </>
  );
}
CreateCustomerPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "form", "common"])),
  },
});
