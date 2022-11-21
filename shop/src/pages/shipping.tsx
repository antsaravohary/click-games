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
  const settings = useSettings();
  if (isLoading) {
    return (<Loader />);
  }

  return (
    <>
      <SEO title="Livraison & Expéditions" />
      <PageHeroSection heroTitle={"Livraison & Expéditions"} />
      <section className="max-w-7xl w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">

        {/* End of page header */}

        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
          <p className="text-lg font-bold">DÉLAIS D'EXPÉDITION</p>
            <p className="text-lg">Les frais d'expédition sont indiqués à la caisse une fois que l'option d'expédition et la destination ont été choisies. </p>
            <p className="text-lg">Veuillez prévoir 1 à 2 jours ouvrables pour que notre équipe traite votre commande. Une fois votre commande traitée et confirmée, vous recevrez un numéro de suivi.</p>
            <p className="text-lg">Toutes les commandes sont expédiées avec un numéro de suivi afin que vous puissiez suivre leur évolution à chaque étape du processus !</p>
            <p className="text-lg">Nous offrons les options de livraison suivantes:</p>
            <p className="text-lg ml-4">* Livraison en France Métropolitaine : Livraison Standard (2 à 5  jours ouvrables à compter de l'expédition en fonction des produits)</p>
            <p className="text-lg ml-4">* Livraison Express (48h uniquement pour certains produits)</p>
            <p className="text-lg">Veuillez noter que toutes les méthodes d'expédition indiquées ci-dessus sont une estimation du délai de livraison. </p>
            <p className="text-lg mt-4">Les colis peuvent être confrontés à des retards indépendants de notre volonté, tels que des retards liés aux douanes ou à la poste. Dans une commande à plusieurs articles, vous pourrez recevoir des colis séparément.</p>
          </div>


          <div className="grid md:grid-cols-2 grid-cols-1 mt-5">
            <img className="w-96 h-auto my-auto" src="/poste_logo1.png" />
            <img className="w-96 h-auto my-auto" src="/poste_logo2.png" />
          </div>
          <div>
            <div className="p-4 border rounded-sm text-lg w-96 border-dark">
              <p>CLICK GAMES </p>
              <p>26 Rue Arbues, 25400 Aundicourt</p>
              <p>Adresse email : support@click-game­s.fr</p>
              <p>Numéro de téléphone : {settings?.contact}</p>
            </div>
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
