import ShopLayout from "@components/layouts/shop";
import CreateOrUpdateProductForm from "@components/product/product-form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import CreatePromotionForm from "@components/promotion/create-promotion-form";

export default function CreateProductPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
        Mise en promotions des produits
        </h1>
      </div>
      <CreatePromotionForm />
    </>
  );
}
CreateProductPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
CreateProductPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common","table"])),
  },
});
