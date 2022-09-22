import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateWithdrawForm from "@components/withdraw/withdraw-form";
import ShopLayout from "@components/layouts/shop";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { SEO } from "@components/seo";

export default function CreateWithdrawPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title="Noveau retrait"/>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-withdraw")}
        </h1>
      </div>
      <CreateOrUpdateWithdrawForm />
    </>
  );
}
CreateWithdrawPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
CreateWithdrawPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
