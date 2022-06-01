import Layout from "@components/layout/layout";
import Accordion from "@components/ui/accordion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFaqQuery } from "@data/faq/use-faq.query";
import { useSettings } from "@contexts/settings.context";
import { useEffect } from "react";
import { SEO } from "@components/seo";
import FooterOne from "@components/layout/footer-one";

export default function HelpPage() {
  const { data, isLoading: loading, error } = useFaqQuery();

  const { t } = useTranslation();
  return (
    <>
 <SEO title="Centre d’aide"/>
 <div className="flex  justify-beetwen flex-col h-screen">
    <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="text-center mb-8">
        <h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
          {t("common:nav-menu-faq")}
        </h1>
      </header>
      <div className="max-w-screen-lg w-full mx-auto">
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <Accordion items={data.data} translatorNS="faq" />
        )}
      </div>
    </section>
  
  <FooterOne/>
  </div>
    </>
  );
}

HelpPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "faq"])),
    },
  };
};
