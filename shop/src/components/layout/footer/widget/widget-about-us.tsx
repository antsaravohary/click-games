import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Logo from '@components/ui/logo';

import { ROUTES } from '@utils/routes';
import Image from 'next/image';
import Text from '@components/ui/text';
import { PhoneIcon } from '@components/icons/phone';
import { EmailIcon } from '@components/icons/sidebar';
import { useSettings } from '@contexts/settings.context';

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  const { t } = useTranslation();
const settings=useSettings();
  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="flex flex-col text-center sm:text-start max-w-[350px] mx-auto sm:ms-0 pb-6 sm:pb-5">
        <Logo href={ROUTES.HOME} className="mb-3 lg:mb-5 mx-auto sm:ms-0" />
        <p className='text-left text-xs'>
          Click Games | E-commerce spécialiste du jeux vidéos | Livraison gratuite à partir de 30€ | Click sur ton jeu
        </p>
        
        <div className='mt-2 text-sm flex items-center'>
          <div>  <PhoneIcon width="15" height="15" /></div>
          <div className='ml-2'>{settings?.contact}</div></div>

        <div className=' text-sm flex items-center'>
          <div>  <EmailIcon width="15" height="15" /></div>
          <a href='mailto:support@click-games.fr' className='ml-2'>support@click-games.fr</a>
        </div>
        <div className='text-sm'>Heure d'ouverture lundi au samedi de 10h à 18h</div>
      </div>

      {social && (
        <ul className="flex flex-wrap justify-center sm:justify-start space-s-4 md:space-s-5 mx-auto md:mx-0">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'}>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default WidgetAbout;
