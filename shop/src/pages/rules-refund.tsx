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
         Politique de remboursement
        </h1>
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">

        </p>
      </header>
      {/* End of page header */}

      <div className="flex flex-col">
        <div className="flex flex-col space-y-4">
          <p className="text-lg">Notre politique dure 14 jours post-reception. Si 14 jours se sont écoulés depuis la réception de votre colis achat, nous ne pouvons malheureusement pas vous offrir un remboursement ou un échange.
Aucun remboursement ou échange n'est possible entre l'expédition et la réception du colis et après 14 jours post-reception. Pour pouvoir bénéficier d’un retour, votre article doit être inutilisé et dans le même état où vous l’avez reçu. Il doit être également dans l’emballage d’origine.
Ce retour se fera à la charge du client.
À noter que, tout retour doit être effectué à l'adresse qui vous sera transmise par mail en faisant votre demande de remboursement à
support@click-games.fr</p>
          <p className="text-lg">Remboursements (le cas échéant)
Une fois que nous aurons reçu et inspecté l’article retourné, nous vous enverrons un e-mail pour vous confirmer que nous l’avons bien reçu. Nous vous informerons également de notre décision quant à l’approbation ou au rejet de votre demande de remboursement.</p>
          <p className="text-lg">Si votre demande est approuvée, alors votre remboursement sera traité, et un crédit sera automatiquement appliqué à votre carte de crédit ou à votre méthode originale de paiement, dans un délai d’un certain nombre de jours.
Pour tout remboursement, merci de nous contacter à
support@click-games.fr</p>
          <p className="text-lg">Remboursements en retard ou manquants (le cas échéant)Si vous n’avez pas encore reçu votre remboursement, veuillez d’abord consulter votre compte bancaire à nouveau.Ensuite, contactez l’entité émettrice de votre carte de crédit, car il pourrait y avoir un délai avant que votre remboursement ne soit officiellement affiché.Ensuite, contactez votre banque. Il y a souvent un délai de traitement nécessaire avant qu’un remboursement ne soit affiché.Si après avoir effectué toutes ces étapes, vous n’avez toujours pas reçu votre remboursement, veuillez s’il vous plait nous contacter à
support@click-games.fr</p>
          <p className="text-lg">Annulation de commande 
Vous pouvez annuler votre commande sous 24h après votre achat. Passé ce délai, la réception du colis sera obligatoire. 
Seules les commandes simples (sans achats peuvent être annulée. Le cas échéant, nous devrons annuler l'intégralité de la commande.
Échanges (le cas échéant)Nous remplaçons un article seulement s’il est défectueux ou endommagé. Si dans ce cas vous souhaitez l’échanger contre le même article, envoyez-nous un e-mail à
support@click-games.fr</p>
          <p className="text-lg">Annulation de commande 
Vous pouvez annuler votre commande sous 24h après votre achat. Passé ce délai, la réception du colis sera obligatoire. 
Seules les commandes simples (sans achats peuvent être annulée. Le cas échéant, nous devrons annuler l'intégralité de la commande.
Échanges (le cas échéant)Nous remplaçons un article seulement s’il est défectueux ou endommagé. Si dans ce cas vous souhaitez l’échanger contre le même article, envoyez-nous un e-mail à
support@click-games.fr</p>
          <p className="text-lg">Il vous incombera de payer vos propres frais d’expédition pour retourner votre article. Les coûts d’expédition ne sont pas remboursables. Si vous recevez un remboursement, les frais de retour seront déduits de celui-ci.En fonction de l’endroit où vous vivez, le délai nécessaire pour recevoir votre produit échangé peut varier.Si vous expédiez un colis d’une valeur supérieure à 50€, vous devriez envisager d’utiliser un service de livraison qui vous permet de suivre l’envoi ou de souscrire à une assurance de livraison. Nous ne garantissons pas que nous recevrons l’article que vous nous retournez.</p>
          <p className="text-lg"></p>
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
