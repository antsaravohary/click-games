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
      <SEO title="Conditions de retour et de remboursement" />
      <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
          <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
            Politique de retour
          </h1>
          <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">

          </p>
        </header>

        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
          <p className="text-lg"> Conformément à l'article L.121-21 et suivants du Code de la Consommation, le Client dispose d'un délai de rétractation de (14) jours francs à compter de la date de réception de sa commande, pour retourner les Produits commandés et/ou pour se rétracter des contrats de prestation de service, sans avoir à justifier de motifs ni à payer de pénalité, à fin de remboursement, à l'exception des frais de retour. Le droit de rétractation ne pourra pas s’appliquer en cas de fourniture d’enregistrements audio ou vidéo ou de logiciels informatiques lorsqu’ils ont été descellés après livraison.</p>
          <p className="text-lg">Concernant la commande de jeu, le Client peut utiliser son droit de rétractation via les modalités suivantes :
 </p>
          <p className="text-lg ml-4"> - En remplissant le formulaire présent au dos de la facture initiale à renvoyer par courrier postal à l’adresse suivante : CLICK INC / CLICK GAMES 26 RUE DES ARBUES , 25400 AUDINCOURT (France) ou par email à l’adresse suivante : support@click-games.fr,</p>
          <p className="text-lg  ml-4" >- En réalisant une demande de rétractation depuis la page contactez-nous à l’adresse https://www.click-games.fr/contact  en bas de page, </p>
          <p className="text-lg  ml-4">- Ou par tout moyen à sa convenance.
Le Client s’engage à renvoyer le jeu encore sous scellé (non ouvert) dans un délai d’un mois maximum au 26 RUE DES ARBUES , 25400 AUDINCOURT (France).
  </p>
          <p className="text-lg"> La résiliation du CLICK GAMES+ peut être réalisée par le Client, à tout moment via les modalités suivantes : </p>
          <p className="text-lg ml-4">- En remplissant le formulaire présent au dos de la facture initiale à renvoyer par courrier postal à l’adresse suivante : CLICK INC / CLICK GAMES 26 RUE DES ARBUES , 25400 AUDINCOURT (France) ou par email à l’adresse suivante : support@click-games.fr, </p>
          <p className="text-lg ml-4">- En réalisant une demande de rétractation depuis la page contactez-nous  à  l’adresse https://www.click-games.fr/contact en bas de page, </p>
          <p className="text-lg  ml-4 ">- En réalisant une demande de rétractation depuis la page contactez-nous  à  l’adresse https://www.click-games.fr/contact en bas de page,Une demande de rétractation de service peut être demandée, par le Client via les modalités suivantes : </p>
          <p className="text-lg ml-4">- En remplissant le formulaire présent au dos de la facture initiale à renvoyer par courrier postal à l’adresse suivante : CLICK INC / CLICK GAMES 26 RUE DES ARBUES , 25400 AUDINCOURT (France) ou par email à l’adresse suivante : support@click-games.fr, </p>
          <p className="text-lg ml-4">- En réalisant une demande de rétractation depuis la page contactez-nous à l’adresse https://www.click-games.fr/contact en bas de page, </p>
          <p className="text-lg ml-4">- Ou par tout moyen à sa convenance.</p>
          <p className="text-lg">En cas d'exercice du droit de rétractation dans le délai susvisé, seuls les prix du jeu et/ou du CLICK GAMES+ commandés sont remboursés.</p>
          <p className="text-lg">Le remboursement des sommes effectivement réglées par le Client sera effectué dans un délai de quatorze (14) jours à compter de la réception, par CLICK GAMES, de la notification de la rétractation du Client.</p>
          <p className="text-lg ml-4">Remboursements (le cas échéant)Une fois que nous aurons reçu et inspecté l’article retourné, nous vous enverrons un e-mail pour vous confirmer que nous l’avons bien reçu. Nous vous informerons également de notre décision quant à l’approbation ou au rejet de votre demande de remboursement.Si votre demande est approuvée, alors votre remboursement sera traité, et un crédit sera automatiquement appliqué à votre carte de crédit ou à votre méthode originale de paiement, dans un délai d’un certain nombre de jours.</p>
          <p className="text-lg">Remboursements en retard ou manquants (le cas échéant)Si vous n’avez pas encore reçu votre remboursement, veuillez d’abord consulter votre compte bancaire à nouveau.Ensuite, contactez l’entité émettrice de votre carte de crédit, car il pourrait y avoir un délai avant que votre remboursement ne soit officiellement affiché.Ensuite, contactez votre banque. Il y a souvent un délai de traitement nécessaire avant qu’un remboursement ne soit affiché.Si après avoir effectué toutes ces étapes, vous n’avez toujours pas reçu votre remboursement, veuillez s’il vous plait nous contacter à support@click-games.fr</p>
          <p className="text-lg">Échanges (le cas échéant)Nous remplaçons un article seulement s’il est défectueux ou endommagé. Si dans ce cas vous souhaitez l’échanger contre le même article, envoyez-nous un e-mail à echange@click-games.com</p>
          <p className="text-lg">Expédition Pour retourner un produit, vous devez l’envoyer par la poste après avoir pris contact par e-mail à support@click-games.fr
</p>
          <p className="text-lg">Il vous incombera de payer vos propres frais d’expédition pour retourner votre article. Les coûts d’expédition ne sont pas remboursables. Si vous recevez un remboursement, les frais de retour seront déduits de celui-ci.</p>
          <p className="text-lg">En fonction de l’endroit où vous vivez, le délai nécessaire pour recevoir votre produit échangé peut varier.
</p>
          <p className="text-lg">Si vous expédiez un article d’une valeur supérieure à 50€, vous devriez envisager d’utiliser un service de livraison qui vous permet de suivre l’envoi ou de souscrire à une assurance de livraison. Nous ne garantissons pas que nous recevrons l’article que vous nous retournez.</p>
          
          </div>
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
