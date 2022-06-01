import ShopLayout from "@components/layouts/shop";
import CreateOrUpdateProductForm from "@components/product/product-form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { SEO } from "@components/seo";
import { useProductSKU } from "@data/product/product-generate-sku.query";
import Loader from "@components/ui/loader/loader";

export default function CreateProductPage() {
  const { t } = useTranslation();
  const { data: sku,isLoading:loadingSku } = useProductSKU();
  if (loadingSku) return <Loader text={t("common:text-loading")} />;
  return (
    <>
     <SEO title="Noveau produit"/>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-product")}
        </h1>
      </div>
      <CreateOrUpdateProductForm sku={sku?.sku} />
    </>
  );
}
CreateProductPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
CreateProductPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
