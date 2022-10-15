import Layout from "@components/layout/layout";
import { privacyPolicy } from "@settings/privacy.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useArticleQuery } from "@data/article/use-article.query";
import Loader from "@components/ui/loader/loader";
import { SEO } from "@components/seo";
import PageHeroSection from "@components/ui/page-hero-section";
import { useSettings } from "@contexts/settings.context";


function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function PrivacyPage() {
  const { t } = useTranslation("policy");
  const { data, isLoading } = useArticleQuery("politique-de-remboursement");
  if (isLoading) {
    return (<Loader />);
  }
  const settings=useSettings();

  return (
    <>


      <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-white">
      </section>
     
    <SEO title="Conditions de retour et de remboursement"/>
    <PageHeroSection heroTitle={"Conditions de retour et de remboursement"} />
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
          
        </h1>
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">

        </p>
      </header>
      {/* End of page header */}

      <div className="flex max-w-7xl mx-auto flex-col">
        <div className="flex flex-col space-y-4">
          <p className="text-lg">Conformément à l'article L.121-21 et suivants du Code de la Consommation, vous disposez d'un délai de rétractation de quatorze jours à compter de la date de réception de votre commande, pour retourner les Produits commandés et/ou pour vous rétracter des contrats de prestation de service, sans avoir à en justifier de motif. Dans le cadre de l’exercice de votre droit de rétractation, les frais de renvoi des Produits sont à votre charge exclusive. Le droit de rétractation ne pourra pas s’appliquer en cas de fourniture d’enregistrements audio ou vidéo ou de logiciels informatiques lorsqu’ils ont été descellés après livraison. </p>
          <p className="text-lg">Le remboursement interviendra 24 Heures après réception du colis retourné </p>
          <p className="text-lg">Le présent formulaire doit être complété et renvoyé uniquement si le Client souhaite se rétracter de la commande passée sur https://www.click-games.fr sauf exclusions ou limites à l'exercice du droit de rétractation suivant les Conditions Générales de Vente applicables. A l'attention de Affaire personnelle commerçant, Click Games - CLICK GAMES 26 rue des arbues, 25400 AUDINCOURT.</p>
          <p className="text-center"> <a className="btn bg-accent p-2 rounded text-white" href="https://api.click-games.fr/storage/formulaire_retractation.pdf" target="_blank">Formulaire de Rétractation</a></p>
         
          <p>Mail: Support@click-games.fr

          </p>
          <p>Téléphone : {settings?.contact}</p>
          <p>Nous vous remercions de votre compréhension.</p>
        </div>


        {/* End of content */}
      </div>
    </section>
    </>
  );
}

PrivacyPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "policy"])),
    },
  };
};
