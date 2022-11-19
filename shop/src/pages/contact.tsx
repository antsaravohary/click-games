import Input from "@components/ui/input";
import Layout from "@components/layout/layout";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useContactMutation } from "@data/customer/use-contact.mutation";
import { siteSettings } from "@settings/site.settings";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SEO } from "@components/seo";
import FooterOne from "@components/layout/footer-one";
import { useSettings } from "@contexts/settings.context";

const contactFormSchema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  subject: yup.string().required("error-subject-required"),
  description: yup.string().required("error-description-required"),
});

export const ContactPage = () => {
  const { t } = useTranslation("common");
  const { mutate, isLoading } = useContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) });
  function onSubmit(values: any) {
    mutate(values);
    reset();
  }
  const settings=useSettings();
  return (
    <>
      <SEO title="Contact" />
      <div className="w-full bg-gray-100">
        <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
          {/* sidebar */}
          <div className="w-full md:w-72 lg:w-96 bg-light p-5 flex-shrink-0 order-2 md:order-1">
            <div className="w-full flex items-center justify-center overflow-hidden mb-8">
              <img
                src="/contact-illustration.jpg"
                alt={t("nav-menu-contact")}
                className="w-full h-auto"
              />
            </div>





            <div className="flex flex-col mb-8">
              <span className="font-semibold text-heading mb-3">
                E-mail:
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-body">
                  support@click-games.fr
                </span>
              </div>
            </div>

            <div className="flex flex-col mb-8">
              <span className="font-semibold text-heading mb-3">
                Téléphone
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-body">
                {settings?.contact}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-body">
                Lundi au samedi de 10h à 18h
                </span>
              </div>
            </div>
         {/**   <div className="flex flex-col mb-8">
              <span className="font-semibold text-heading mb-3">
               Horaires
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-body">
               Lundi au samedi de 10h à 18h
                </span>
              </div>
            </div>*/} 
            <div className="flex flex-col mb-8">
              <span className="font-semibold text-heading mb-3">
                Contact par courrier 
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-body">
                Click Games 26 Rue Arbues, 25400 Aundicourt
                </span>
              </div>
            </div>
           
            <div className="flex flex-col mb-8">
              <span className="font-semibold text-heading mb-4">
                {t("text-follow-us")}
              </span>
              <div className="flex items-center justify-start">
                {siteSettings.author.social?.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    className={`text-muted focus:outline-none me-8 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
       
          </div>

          {/* Contact form */}
          <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
            <div className="my-2">
                  {/*<p className="my-2">Contacter La Poste - Colis suivi</p>
                  <p className="my-2">Vous avez besoin de conseils et d'informations, contactez La Poste au 3631 du lundi au vendredi de 8h30 à 19h00 et le samedi de 8h30 à 13h00. Ce service est accessible pour tous les appels émis depuis la France métropolitaine. (L'appel est non surtaxé hors surcoût éventuel selon votre opérateur).</p>
                */}  <p className="my-2">Rappel : En tant que client, vous avez accès a l’ensemble des opérations courantes (Demande d’échange, suivi des colis, factures, modification d’adresse, résiliation, …) directement sur votre Espace Client. Sinon, merci de préciser votre demande ci-dessous (réponse assurée sous 48h hors week-end et jours fériés).</p>
                  
            </div>
            <h1 className="mb-2 mt-2 text-xl md:text-2xl font-body font-bold text-heading">
              {t("text-questions-comments")}
            </h1>
         {/**   <div className="flex flex-col text-sm space-y-2 mb-7">
              <p>Nous vous rappelons que les réponses à la plupart des questions que vous pourrez poser se trouvent sous la rubrique «<a href="/support">Supports</a>»</p>
              <p>
                Si vous ne trouvez pas de réponse sous cette rubrique nous vous invitons à poser votre question dans le formulaire ci-dessous. Notre équipe vous répondra sous 24 heures.
              </p>
              <p>Vous pouvez également nous contacter à tout moment par mail ou par téléphone</p>




            </div> */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label={t("text-name")}
                  {...register("name")}
                  variant="outline"
                  error={t(errors.name?.message!)}
                />
                <Input
                  label={t("text-email")}
                  {...register("email")}
                  type="email"
                  variant="outline"
                  error={t(errors.email?.message!)}
                />
              </div>
              <Input
                label={t("text-subject")}
                {...register("subject")}
                variant="outline"
                className="my-6"
                error={t(errors.subject?.message!)}
              />
              <TextArea
                label={t("text-description")}
                {...register("description")}
                variant="outline"
                className="my-6"
                rows={6}
                error={t(errors.description?.message!)}
              />

              <Button loading={isLoading} disabled={isLoading}>
                {t("text-submit")}
              </Button>
            </form>
            <div className="my-2">
                  <p className="my-2">Conformément à l'article L.121-21 et suivants du Code de la Consommation, vous disposez d'un délai de rétractation de quatorze jours à compter de la date de réception de votre commande, pour retourner les produits commandés et/ou pour vous rétracter des contrats de prestation de service, sans avoir à en justifier de motif. Dans le cadre de l’exercice de votre droit de rétractation, les frais de renvoi des produits sont à votre charge exclusive. Le droit de rétractation ne pourra pas s’appliquer en cas de fourniture d’enregistrements audio ou vidéo ou de logiciels informatiques lorsqu’ils ont été descellés après livraison. Télécharger le document : Formulaire de Rétractation</p>
                  <p className="text-center my-2"> <a className="btn bg-accent p-2 my-2 rounded text-white" href="https://api.click-games.fr/storage/formulaire_retractation.pdf" target="_blank">Formulaire de Rétractation</a></p>
                  <p className="my-2">Conformément à l’article L. 612-1 du code de la consommation, vous pouvez recourir gratuitement au service de médiation CM2C dont nous relevons par voie électronique: https://www.cm2c.net/declarer-un-litige.php ou par voie postale: 14 rue saint Jean 75017 Paris. Délai moyen de traitement inférieur au délai légal de 90 jours.</p>
                  <p className="my-2">Conformément à l'article 14 du Règlement (UE) n°524/2013, la Commission Européenne a mis en place une plateforme de Règlement en Ligne des Litiges, facilitant le règlement indépendant par voie extrajudiciaire des litiges en ligne entre consommateurs et professionnels de l'Union européenne. Cette plateforme est accessible au lien suivant : https://ec.europa.eu/consumers/odr/</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ContactPage.Layout = Layout;
export default ContactPage;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
