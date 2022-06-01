import Layout from "@components/layout/layout";
import Accordion from "@components/ui/accordion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFaqQuery } from "@data/faq/use-faq.query";
import { useSettings } from "@contexts/settings.context";
import { useEffect, useState } from "react";
import { SEO } from "@components/seo";
import FooterOne from "@components/layout/footer-one";
import HelpCenterList from "@components/support/help-center-list";
import Button from "@components/ui/button";
import SupportContactForm from "@components/support/support-contact-form";
import Footer from "@components/layout/footer/footer";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import LinkButton from "@components/ui/link-button";


export default function HelpPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const { data: dataMe } = useCustomerQuery();
  const { openModal } = useModalAction();
  const { isAuthorize } = useUI();
  const { t } = useTranslation();
  const onContact = () => {
    if (!isAuthorize) {
      return openModal("LOGIN_VIEW");
    }
    if (isAuthorize) {
      setShowContactForm(true)
    }
  }
  return (
    <>
      <SEO title="Centre d’aide" />
      <div className="flex  justify-beetwen flex-col h-screen bg-white">
        <div className="  md:mx-8 flex flex-col md:flex-row">
          <div className="flex-1  m-4 p-4">
            {!showContactForm ? <>      <h3 className="border-l border-l-8 pl-2 text-2xl font-bold leading-6 border-yellow-600 mb-10">Vous êtes client ? Utilisez ce formulaire 
Pour bénéficier d’une prise en charge plus rapide et efficace</h3>
              <div className="flex flex-col w-72">
                <Button onClick={onContact} size="big">Ouvrir un ticket</Button>
                <span className="text-xs text-center">Le délai de prémière reponse est entre 48h à 72h</span>
              </div>
              <h3 className="border-l border-l-8 pl-2 text-2xl font-bold leading-6 border-gray-600 mt-10 mb-10">Pas encore client ? besoin d’assistance ? 
Contactez nous depuis ce formulaire</h3>
              <div className="flex flex-col w-72">
                <LinkButton href={"/contact"} size="big">Contactez nous</LinkButton>
              </div>
              </> : <>
              <h3 className="border-l border-l-8 pl-2 text-2xl font-bold leading-6 border-red-600 mb-5">Envoyer une demande</h3>
              <SupportContactForm />
            </>}



          </div>
          <div className="flex-1  m-4 p-4 ">
            <h3 className="border-l border-l-8 pl-2 text-2xl font-bold leading-6 border-red-600 mb-5">Centre d'aide</h3>
            <HelpCenterList />
          </div>
        </div>
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
