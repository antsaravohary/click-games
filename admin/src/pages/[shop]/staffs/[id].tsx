import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopLayout from "@components/layouts/shop";
import AddStaffForm from "@components/shop/staff-form";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { useStaffsQuery } from "@data/shop/use-staffs.query";
import { useStaffQuery } from "@data/shop/use-staff.query";
import { useRouter } from "next/router";
import { SEO } from "@components/seo";

export default function EditStaffPage() {
  const { t } = useTranslation();
  const router =useRouter();
  const {data,isLoading}=useStaffQuery(router.query.id as string);
  if(isLoading&&!data){
      return (<div>
          Chargement ....
      </div>)
  }
  return (
    <>
    <SEO title="Collaborateur"/>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
        Modification de compte collaborateur
        </h1>
      </div>
      <AddStaffForm initialValues={data?.staff} />
    </>
  );
}
EditStaffPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
EditStaffPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "form", "common"])),
  },
});