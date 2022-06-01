import { CardIcon } from "@components/icons/CardIcon";
import { CurrencyExchange } from "@components/icons/CurrencyExchange";
import { DeliveryTruckIcon } from "@components/icons/DeliveryTruckIcon";
import Link from "@components/ui/link";
import { HelpCenterIcon } from "@components/icons/HelpCenterIcon";
import { ROUTES } from "@utils/routes";
type PropsFooter = {
  children?: any;
  title: String;
  description: String;
  Icon: any;
};
const FooterItems = ({ children, title, description, Icon }: PropsFooter) => (
  <div className="lg:col-span-2 md:col-span-4 col-span-8 flex justify-start flex-col items-center max-w-xs">
    <div className="text-white">{Icon}</div>
    <h2 className="text-white text-2xl  text-center">{title}</h2>
    <p className="text-center text-gray-400 text-base  ">{description}</p>
    {children}
  </div>
);
const FooterOne = () => {
  return (
    <div className="flex flex-col items-center content-center  bg-black w-full py-8 px-4">
      <a className="text-white mb-4 bg-accent p-2 rounded hidden" href="/portal-vendor">
      Vendre sur Click Univers
      </a>
      <div className="flex  ">
        <Link href="https://admin.click-univers.com" className="text-white hidden mx-2">
          Portail Vendeur
        </Link>
        <Link href={ROUTES.HELP} className="text-white mx-2">
          Centre d'aide
        </Link>
        <Link href={ROUTES.CONTACT} className="text-white mx-2">
          Contact
        </Link>
        <Link href={"/terms"} className="text-white mx-2">
        Mentions légales 
        </Link>
      </div>
      <div className="grid grid-cols-8 gap-4 w-max">
        <FooterItems
          title="Garantie de remboursement"
          description="Nous retournons l'argent dans les 15 jours en cas de non conformité, des frais peuvent vous être appliquer."
          Icon={<CurrencyExchange width="32" height="32" />}
        />
        <FooterItems
          title="Livraison rapide et gratuite"
          description="Livraison gratuite pour toute commande de plus de 35 €"
          Icon={<DeliveryTruckIcon width="32" height="32" />}
        />
        <FooterItems
          title=" Help Center"
          description="   Assistance 24 heures sur 24 pour une expérience de magasinage fluide"
          Icon={<HelpCenterIcon width="32" height="32" />}
        />
        <FooterItems
          title=" Paiement en ligne sécurisé"
          description="Nous possédons un certificat SSL"
          Icon={<CardIcon width="32" height="32" />}
        ></FooterItems>
      </div>
      <div>
      <img style={{height:"32px", width:"auto"}}
                    src="/card.png"
                    alt="Inbox user interface"
                  />
      </div>
    </div>
  );
};
export default FooterOne;
