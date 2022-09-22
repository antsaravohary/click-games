import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from "@utils/auth-utils";
import CreateOrUpdateFaqForm from "@components/faq/faq-form";

export default function CreateCategoriesPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
       Ajout d'une nouvelle centre d'aide
        </h1>
      </div>
      <CreateOrUpdateFaqForm />
    </>
  );
}
CreateCategoriesPage.authenticate = {
  permissions: adminOnly,
};
CreateCategoriesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
