import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { SEO } from "@components/seo";
import AdminLayout from "@components/layouts/admin";
import CreateOrUpdateGameForm from "@components/game/game-form";

export default function CreateGamePage() {
  const { t } = useTranslation();

  return (
    <>
     <SEO title="Noveau produit"/>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-game")}
        </h1>
      </div>
      <CreateOrUpdateGameForm/>
      
    </>
  );
}
CreateGamePage.authenticate = {
  permissions: adminOnly,
};
CreateGamePage.Layout = AdminLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
