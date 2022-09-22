import Layout from "@components/layouts/admin";
import CreateOrUpdateCategoriesForm from "@components/category/category-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreatePromotionForm from "@components/promotion/create-promotion-form";
import CreateOrUpdatePromotionTypeForm from "@components/promotoin-type/promotion-type-form";
//import { useTranslation } from "next-i18next";

export default function CreateCategoriesPage() {
  //const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
        Créer une nouvelle promotion type
        </h1>
      </div>
      <CreateOrUpdatePromotionTypeForm />
    </>
  );
}

CreateCategoriesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
