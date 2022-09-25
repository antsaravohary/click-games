import { BannerType } from "@settings/site-pages.settings";
import { ArrowNext, ArrowPrev } from "@components/icons";
import { useUI } from "@contexts/ui.context";
import { Waypoint } from "react-waypoint";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type BannerProps = {
  banner: BannerType;
  className?: string;
  preview:number;
};

SwiperCore.use([Navigation]);


const BannerShort: React.FC<BannerProps> = ({ banner, className,preview}) => {
  const { t } = useTranslation("common");
  const { stickMobileFilter, unstickMobileFilter } = useUI();
  const router=useRouter();
  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
     // stickMobileFilter();
    }
  };
  const breakpoints = {
    '768': {
      slidesPerView: preview,
      spaceBetween: 16,
    },
    '640 ': {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    '0': {
      slidesPerView: 1,
    },};
  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden -z-1">
        <div className="relative">
          <Swiper
            id="banner"
            loop={false}
            breakpoints={breakpoints}
            autoplay={true}
            resizeObserver={true}
            slidesPerView={preview}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
          >
            {banner?.gallery?.map((item) => (
              <SwiperSlide className="mx-2 cursor-pointer" key={item.id} onClick={()=>{if(item?.url)router.push(item?.url)}}>
                <img
                  className="w-full h-auto"
                  src={item.image ?? "/banner/grocery.png"}
                  alt={item.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="prev md:hidden cursor-pointer absolute top-2/4 start-4 md:start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
            role="button"
          >
            <span className="sr-only">{t("text-previous")}</span>
            <ArrowPrev width={18} height={18} />
          </div>
          <div
            className="next md:hidden cursor-pointer absolute top-2/4 end-4 md:end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
            role="button"
          >
            <span className="sr-only">{t("text-next")}</span>
            <ArrowNext width={18} height={18} />
          </div>
        </div>
      </div>

      <Waypoint
        onLeave={stickMobileFilter}
        onEnter={unstickMobileFilter}
        onPositionChange={onWaypointPositionChange}
        topOffset={66}
      />
    </div>
  );
};

export default BannerShort;
