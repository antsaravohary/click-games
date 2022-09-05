import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SEO } from "@components/seo";
import HomeLayout from "@components/layout/home-layout";
import LoginForm from "@components/auth/login";

export default function Loginpage() {


  const { t } = useTranslation();
  return (
    <>
      <SEO title="Connexion" />
      <div className="max-w-7xl mx-auto mt-4 sm:px-4 lg:px-4 flex justify-center">
        <LoginForm />
      </div>
    </>
  );
}

Loginpage.Layout = HomeLayout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "faq"])),
    },
  };
};
