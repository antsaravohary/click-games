import Container from '@components/ui/container';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ payment }) => {
  const { t } = useTranslation();
  return (
    <div className="pb-20 lg:pb-7">
      <Container>
        <div className="flex flex-col md:flex-row text-center md:justify-center border-t border-skin-three pt-6 lg:pt-7">
          <p className="text-skin-base text-sm leading-7 lg:leading-[27px] lg:text-15px">
            &copy;&nbsp;{t('text-copyright')} {year}&nbsp;
            <a
              className="text-skin-base transition-colors duration-200 ease-in-out hover:text-skin-primary"
              href={siteSettings.author.websiteUrl}
            >
              {siteSettings.author.name}
            </a>
            &nbsp; {t('text-all-rights-reserved')}
          </p>
        
        </div>
        <p className='text-center text-xs mt-2 '>
        Les noms des produits présentés sur ce site sont utilisés à des fins d'identification uniquement.
        Toutes les marques commerciales et marques déposées appartiennent à leurs propriétaires respectifs.</p>
      </Container>
    </div>
  );
};

export default Copyright;
