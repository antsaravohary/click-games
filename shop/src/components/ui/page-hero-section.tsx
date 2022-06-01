import { useTranslation } from 'next-i18next';
import Breadcrumb from '@components/ui/breadcrumb';
import cn from 'classnames';
import useWindowSize from '@utils/use-window-size copy';

interface HeaderProps {
  backgroundThumbnail?: any
  heroTitle?: string;
  mobileBackgroundThumbnail?: any;
  variant?: 'default' | 'white';
}

const PageHeroSection: React.FC<HeaderProps> = ({
  backgroundThumbnail = '/assets/images/page-hero-bg.jpg',
  heroTitle = 'text-page-title',
  mobileBackgroundThumbnail = '/assets/images/page-hero-bg.jpg',
  variant = 'default',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <div
      className={cn(
        'flex justify-center md:min-h-[250px] lg:min-h-[288px] py-20 w-full bg-cover bg-no-repeat bg-center page-header-banner',
        {
          'style-variant-white': variant === 'white',
        }
      )}
      style={{
        backgroundImage: `url(${
          width! > 480 ? backgroundThumbnail : mobileBackgroundThumbnail
        })`,
      }}
    >
      <div className="w-full flex flex-col items-center justify-center relative">
        <h2
          className={cn(
            'text-xl md:text-2xl lg:text-3xl 2xl:text-[40px] font-bold text-center',
            {
              'text-skin-base': variant === 'default',
              'text-skin-inverted': variant === 'white',
            }
          )}
        >
          <span className="font-manrope block font-bold mb-3 md:mb-4 text-light lg:mb-5 2xl:mb-7 ">
            {t(heroTitle)}
          </span>
        </h2>
      
      </div>
    </div>
  );
};

export default PageHeroSection;
