import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CreateOrUpdateBrandForm from "@components/brand/brand-form";
import { useRouter } from "next/router";

export default function CreateTypePage() {
  const { t } = useTranslation();
  const router =useRouter();
  const category_id=router.query.id;
    return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-type")}
        </h1>
      </div>
      <CreateOrUpdateBrandForm/>
    </>
  );
}
CreateTypePage.Layout = Layout;


export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
