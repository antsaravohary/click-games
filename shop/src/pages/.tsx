import Layout from "@components/layout/layout";
import Accordion from "@components/ui/accordion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFaqQuery } from "@data/faq/use-faq.query";
import { useSettings } from "@contexts/settings.context";
import { useEffect } from "react";
import { SEO } from "@components/seo";
import FooterOne from "@components/layout/footer-one";
import HomeLayout from "@components/layout/home-layout";
import LoginForm from "@components/auth/login";

export default function Loginpage() {


  const { t } = useTranslation();
  return (
    <>
      <SEO title="Connexion" />
      <div className="max-w-7xl mx-auto mt-4 sm:px-4 lg:px-4 flex justify-center h-screen">
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
