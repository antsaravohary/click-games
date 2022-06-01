
import FeaturedCard from '@components/cards/featured-card';
import useWindowSize from '@utils/use-window-size copy';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';
import ReferFriendsIcon from '@components/icons/icons/featured/refer-friends-icon';
import DeliveryIcon from '@components/icons/icons/featured/delivery-icon';
import ChatIcon from '@components/icons/icons/featured/chat-icon';
import FeedbackIcon from '@components/icons/icons/featured/feedback-icon';

const data = [
  {
    id: 1,
    icon: (
      <ReferFriendsIcon
        color="#F38E00"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Parrainez des amis et obtenez des coupons de réductions sur tous les articles.',
    href: ROUTES.HOME,
    bgColor: '#FFEED6',
  },
  {
    id: 2,
    icon: (
      <DeliveryIcon
        color="#0095E7"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Un système de livraison rapide Recevez vos produits le jour de la sortie.',
    href: ROUTES.HOME,
    bgColor: '#CCEDFF',
  },
  {
    id: 3,
    icon: (
      <ChatIcon
        color="#02B290"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'La communauté de joueur s’agrandit  obtenez des conseils et de d’autres joueurs solutions, et astuce ',
    href: ROUTES.HOME,
    bgColor: '#D7F1EC',
  },
  {
    id: 4,
    icon: (
      <FeedbackIcon
        color="#FF7B7B"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'La garantie d’un service fiable et authentique   ',
    href: ROUTES.HOME,
    bgColor: '#FFE1E1',
  },
];

interface Props {
  className?: string;
}

const breakpoints = {
  '1024': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '640 ': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const FeatureGrid: React.FC<Props> = ({
  className = ' mt-5',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`heightFull ${className}`}>
      {width! < 1536 ? (
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          prevActivateId="featured-carousel-button-prev"
          nextActivateId="featured-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide key={`featured-key-${item.id}`}>
              <FeaturedCard item={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="2xl:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureGrid;
