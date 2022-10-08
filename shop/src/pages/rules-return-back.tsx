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
          <p className="text-lg">Si vous souhaitez nous retourner votre commande pour une raison quelconque. Notre équipe est à votre disposition par mail 7j/7 et par téléphone du lundi à jeudi de 9H à 16H afin de vous assister dans votre démarche.</p>
          <p className="text-lg">Après la réception de votre colis vous avez jusqu’à 14 jours pour nous faire savoir par mail à <a className="text-accent" href="mailto:support@click-games.fr">support@click-games.fr</a> ou depuis notre page de contact que vous souhaitez retourner votre colis.
          </p>
          <p className="text-lg">Selon votre préférence vous pourrez alors choisir l’une des options suivantes, sous conditions que l’article soit renvoyé dans un état neuf non endommagé identique à celui dans lequel il vous a été expédié :</p>
          <ul className="list-disc ml-4">
            <li >
              Obtenir un bon d’achat d’une valeur équivalente sur la boutique pour de nouveaux achats.
            </li>
            <li> Obtenir directement un produit d’une valeur équivalente sur la boutique à celui retourné.</li>
            <li> Obtenir un remboursement de votre commande.
            </li>
          </ul>
          <p className="text-lg">Veuillez par ailleurs considérer avant de passer une commande sur notre boutique les exceptions auxquelles nous n’accordons pas de bon d’achat aux retours et aux échanges :</p>
          <ul className="list-disc ml-4">
            <li>Les articles retournés ne doivent avoir aucun signe d’usure d’utilisation apparente.</li>
            <li>Les articles retournés doivent être accompagnés de la facture ou d’un QR Code de retour délivré par notre service supporte à l’adresse <a className="text-accent" href="mailto:support@click-games.fr">support@click-games.fr</a>  et de leurs emballages d'origine pour pouvoir obtenir un remboursement.</li>
    

          </ul>
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
