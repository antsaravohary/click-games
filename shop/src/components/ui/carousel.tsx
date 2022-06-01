import ChevronLeft from "@components/icons/chevron-left";
import ChevronRight from "@components/icons/chevron-right";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Thumbs, Navigation, Pagination, Zoom } from "swiper";
import "swiper/swiper-bundle.min.css";
import 'swiper/components/zoom/zoom.min.css';
import Image from "next/image";
import { useState } from "react";

interface Props {
  gallery: any[];
}
SwiperCore.use([Thumbs, Navigation, Pagination,Zoom]);
// product gallery breakpoints
const galleryCarouselBreakpoints = {
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 3,
  },
  800: {
    slidesPerView: 4,
  },
};
export const ThumbsCarousel: React.FC<Props> = ({ gallery }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div>
      <Swiper
        id="productGallery"
        thumbs={{ swiper: thumbsSwiper }}
        zoom
        navigation
        spaceBetween={0}
        slidesPerView={1}
      >
        {gallery?.map((item: any) => (
          <SwiperSlide
            key={`product-gallery-${item.id}`}
            className="flex items-center justify-center"

          >
            <div style={{ position: "relative", width: "100%", height:"350px", paddingBottom: "20%" }}>
            <Image
              src={item?.original ?? "/product-placeholder.svg"}
              alt={`Product gallery ${item.id}`}
              layout="fill"
              objectFit="contain"
              loading="eager"

              // className="product-image"
            />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* End of product main slider */}

      <div className="max-w-md mt-5 lg:mt-8 mx-auto relative lg:pb-2">
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={20}
          watchSlidesVisibility={true}
          watchSlidesProgress={true}
          breakpoints={galleryCarouselBreakpoints}
          navigation={{
            prevEl: ".product-gallery-prev",
            nextEl: ".product-gallery-next",
          }}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-200 border-opacity-75 hover:opacity-75"
            >
              <Image
                src={item?.thumbnail ?? "/product-placeholder.svg"}
                alt={`Product thumb gallery ${item.id}`}
                width={80}
                loading="eager"
                height={80}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="product-gallery-prev cursor-pointer absolute top-2/4 -start-4 md:-start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-gray-100">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <div className="product-gallery-next cursor-pointer absolute top-2/4 -end-4 md:-end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-gray-100">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
