import OwnerLayout from "@components/layouts/owner";
import ShopForm from "@components/shop/shop-form";
import { useMeQuery } from "@data/user/use-me.query";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CreateShopPage() {
  const { t } = useTranslation();
  const { data: meData, isLoading: loading, error } = useMeQuery();
  if(loading){
    return <div>Chargement ...</div>
  }
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-shop")}
        </h1>
      </div>
      <ShopForm
        initialValues={{
          balance: {
            payment_info: {
              name: meData?.name,
              email: meData?.email,
            },
          },
        }}
      />
    </>
  );
}
CreateShopPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
CreateShopPage.Layout = OwnerLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "form"])),
  },
});
