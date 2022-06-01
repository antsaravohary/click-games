import { ThumbsCarousel } from "@components/ui/carousel";
import Truncate from "@components/ui/truncate-scroll";
import { useUI } from "@contexts/ui.context";
import { useModalState } from "@components/ui/modal/modal.context";
import { Waypoint } from "react-waypoint";
import PriceView from "@components/common/price-view";
const PurchaseProductDetailModal = () => {
  const { showModalStickyBar, hideModalStickyBar, displayModalStickyBar } =
    useUI();
  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      showModalStickyBar();
    }
  };
  const { data } = useModalState();
  const product = data?.product;
  console.log("data", data);
  return (
    <article className="bg-light w-full md=min-w-5xl max-w-5xl relative z-[51]">
      <div className="flex flex-col md:flex-row border-b border-border-200 border-opacity-70">
        <div className="md:w-1/2 p-5 md:pt-10 lg:p-14 xl:p-16">
          <div className="product-gallery h-full relative">
            {product?.gallery?.length && (
              <ThumbsCarousel gallery={product?.gallery} />
            )}
          </div>
        </div>
        <div className="flex justify-start md:w-1/2 p-5 md:pt-10 lg:p-14 xl:p-16">
          <Waypoint
            onLeave={showModalStickyBar}
            onEnter={hideModalStickyBar}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="flex flex-col items-start overflow-hidden">
              <div className="w-full">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading cursor-pointer transition-colors hover:text-accent">
                    {product?.name}
                  </h1>
                </div>

                <div className="mb-5 md:mb-10 mt-3 w-96 md:mt-4 text-body text-sm leading-7">
                  <Truncate character={400}>{product?.description}</Truncate>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Prix de vente:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                   <PriceView amount={product?.price}/>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Quantité:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                   {product?.quantity}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                   Prix total:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                   <PriceView amount={product?.total_price}/>
                  </dd>
                </div>
              </dl>
            </div>
                {/* end of del price markup  */}
              </div>
            </div>
           
          </Waypoint>
          
        </div>
      </div>
    </article>
  );
};

export default PurchaseProductDetailModal;
