import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import ProfileForm from "@components/profile/profile-form";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import ErrorMessage from "@components/ui/error-message";
import Address from "@components/address/address";
import Card from "@components/ui/card";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SEO } from "@components/seo";
import PaymentList from "@components/payment/payment-list";
import PaymentForm from "@components/payment/payement-form";
import Payment from "@components/payment/payment";
import AccountLayout from "@components/layout/account-layout";
import PaymentInfo from "@components/bank/payment-info";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "forms"])),
    },
  };
};

export default function ProfilePage() {
  const { isLoading: loading, data, error } = useCustomerQuery();
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <SEO title="Profil" />
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
      
        {/* End of sidebar navigation */}
        {loading ? (
          <Spinner showText={false} />
        ) : (
          <div className="w-full overflow-hidden">
            <div className="mb-8">
              <ProfileForm user={data?.me} />
            </div>
            <Card className="w-full">
              <Address
                me={data?.me}
                id={data?.me?.id!}
                addresses={data?.me?.address!}
                heading="text-addresses"
                type="billing"
              />
            </Card>
         {/**  <Card className="w-full">

             { <Payment/> }
            </Card>*/}  
         
          </div>
        )}
      
      </div>
    </>
  );
}

ProfilePage.Layout = AccountLayout;
