import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
import { CurrencyExchange } from '@components/icons/CurrencyExchange';
import { DeliveryTruckIcon } from '@components/icons/DeliveryTruckIcon';
import { HelpCenterIcon } from '@components/icons/HelpCenterIcon';
import { CardIcon } from '@components/icons/CardIcon';
import { GuranteeIcon } from '@components/icons/gurantee-icon';
import Image from 'next/image';
import { useArticlesQuery } from '@data/article/use-articles.query';
const { widgets, payment } = footer;
const FooterItems = ({ children, title, description, Icon }: PropsFooter) => (
  <div className="lg:col-span-2 md:col-span-4 col-span-8 flex justify-start flex-col items-center max-w-xs">
    <div className="text-dark">{Icon}</div>
    <h2 className="text-dark text-xl  text-center">{title}</h2>
    <p className="text-center text-xs text-gray-400 text-base  ">{description}</p>
    {children}
  </div>
);
const Footer: React.FC = () => {
  const { data: articleData } = useArticlesQuery({ limit: 50, type: "rules" });
  const articles = articleData?.pages[0]?.data ?? [];
  return (
    <footer className="bg-white pt-5 lg:pt-14 2xl:pt-16">
      <div className='flex justify-center mb-5 border-b pb-4'>
        <div className="grid grid-cols-8 gap-4 w-max">
          <FooterItems
            title="Livraison"
            description="Livraison gratuite à partir de 35 € d’achat"
            Icon={<DeliveryTruckIcon color='#000' width="32" height="32" />}
          />
          <FooterItems
            title="Paiement sécurisé"
            description="Paiement sécurisé par Carte bancaire"
            Icon={<CardIcon width="32" height="32" color='#000' />}
          >
            <ul className="flex flex-wrap mt-2 justify-center items-center space-s-4 sm:space-s-5 lg:space-s-7 -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
              {payment?.map((item) => (
                <li
                  className="mb-2 md:mb-0 transition hover:opacity-80 inline-flex"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : '/#'}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={item.height}
                      width={item.width}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </FooterItems>
          <FooterItems
            title="Protection acheteur"
            description="Retournez vos articles sous 14 jours, Remboursement intégral de la commande"
            Icon={<GuranteeIcon width="32" height="32" color='#000' />}
          />
          <FooterItems
            title="Centre d’aide"
            description=" Assistance 24/24h 7/7J par mail ou depuis de votre espace"
            Icon={<HelpCenterIcon width="32" height="32" color='#000' />}
          ></FooterItems>
        </div></div>
      <Widgets widgets={[...widgets,{ id: 2, widgetTitle: 'widget-title-our-information',lists: articles.map(a=>({ id:a?.id,title:a?.title, path:"/terms/"+a?.slug}))}]} />
      <Copyright payment={payment} />
      <div className="px-2 pb-4">

      </div>
    </footer>
  );
}

export default Footer;
