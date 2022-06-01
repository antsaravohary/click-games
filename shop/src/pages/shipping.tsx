import Layout from "@components/layout/layout";
import { privacyPolicy } from "@settings/privacy.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useArticleQuery } from "@data/article/use-article.query";
import Loader from "@components/ui/loader/loader";
import { SEO } from "@components/seo";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function PrivacyPage() {
  const { t } = useTranslation("policy");
  const { data, isLoading } = useArticleQuery("politique-de-remboursement");
  if (isLoading) {
    return (<Loader />);
  }

  return (
    <>
     <SEO title="Conditions de retour et de remboursement"/>
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
          Livraison & Expéditions
        </h1>
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0++.5">

        </p>
      </header>
      {/* End of page header */}

      <div className="flex flex-col">
        <div className="flex flex-col space-y-4">
          <p className="text-lg">Nous expéditions les commandes de notre entrepôt 24 à 48 heures après l’achat.</p>
          <p className="text-lg">La livraison est offerte à partir de 35 € d’achat ! Nous livrons partout en France.</p>
          <p className="text-lg">Vous revenez automatiquement un e-mail avec un numéro de suivi des colis dès l’expédition de votre commande(24 à 48 heures après votre achat.)</p>
          <p className="text-lg">Le délai de livraison moyen est de 2 à 5 jours ouvrés.</p>
          <p className="text-lg">Si votre commande ne vous parvient pas dans un délai de plus de 20 jours. N’hésitez pas à nous contacter à l’adresse : support@click-games.fr</p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 mt-5">
          <img className="w-96 h-auto my-auto" src="/poste_logo1.png"/>
          <img className="w-96 h-auto my-auto" src="/poste_logo2.png"/>
        </div>

        {/* End of content */}
      </div>
    </section></>
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
