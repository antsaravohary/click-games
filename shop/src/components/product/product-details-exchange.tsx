import Image from "next/image";
import BackButton from "@components/ui/back-button";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import usePrice from "@utils/use-price";
import { ThumbsCarousel } from "@components/ui/carousel";
import { useTranslation } from "next-i18next";
import { getVariations } from "@utils/get-variations";
import { useState } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import Truncate from "@components/ui/truncate-scroll";
import { scroller, Element } from "react-scroll";
import ProductCategories from "./product-details/product-categories";
import VariationPrice from "./product-details/product-variant-price";
import ProductAttributes from "./product-details/product-attributes";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import NoticeView from "./notice-view";
import { useModalAction } from "@components/ui/modal/modal.context";
import DeliveryOptionView from "./delivery-option-view";
import Badge from "@components/ui/badge";
import Tab from "@components/common/tab";
import NoticeList from "./notice-list";
import dayjs from "dayjs";
import { BoxImportantIcon } from "@components/icons/box-important-icon";
import { SendMessage } from "./send-message/send-message";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import {
  formatDateComplet,
  formatDateCompletWithDay,
} from "@utils/format-date";
import { DeliveryIcon } from "@components/icons/delivery-icon";
import { DeliveryTruckIcon } from "@components/icons/DeliveryTruckIcon";
import { CheckMark } from "@components/icons/checkmark";
import Tooltip from "@components/ui/tool-tips";
import { InfoIcon } from "@components/icons/info";
import { Button } from "..";
import { DataTransferIcon } from "@components/icons/category";
import LinkButton from "@components/ui/link-button";

type Props = {
  product: any;
  variant?: "defaultView" | "modalView";
};

const ProductDetailsExchange: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const {
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    categories,
    gallery,
    type,
    quantity,
    mode,
    user,
    shop,
    updated_at,
  } = product ?? {};
  const { data:dataMe, isLoading: loadingMe } = useCustomerQuery();
  const subscription = dataMe?.me?.subscription;
  const { openModal } = useModalAction();
  const { t } = useTranslation("common");
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const { price, basePrice, discount } = usePrice({
    amount: product?.price,
    baseAmount: product?.sale_price,
  });

  const navigate = (path: string) => {
    router.push(path);
  };

  const variations = getVariations(product?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
    Object.keys(variations).every((variation) =>
      attributes.hasOwnProperty(variation)
    )
    : true;

  let selectedVariation = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo("details", {
      smooth: true,
      offset: -80,
    });
  };
  let dateDelivery = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
  switch (dateDelivery.getDay()) {
    case 0:
      dateDelivery = new Date(dateDelivery.getTime() + 2 * 24 * 60 * 60 * 1000);
      break;
    case 1:
      dateDelivery = new Date(dateDelivery.getTime() + 1 * 24 * 60 * 60 * 1000);
      break;
    case 2:
      dateDelivery = new Date(dateDelivery.getTime() + 1 * 24 * 60 * 60 * 1000);
      break;
    case 6:
      dateDelivery = new Date(dateDelivery.getTime() + 2 * 24 * 60 * 60 * 1000);
      break;

    default:
      break;
  }

  /**
   *
   * {size: "Large", color: "Black", weight: "1kg"}
   */

  return (
    <article className="rounded-lg bg-light lg:mx-24">
      <div className="flex flex-col bg-light md:flex-row lg:mx-16 border-b border-border-200 border-opacity-70">
        <div className="md:w-1/2 p-6 pt-8 lg:p-14 xl:p-16">
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            <BackButton />
            {discount && (
              <div className="rounded-full text-xs leading-6 font-semibold px-3 bg-yellow-500 text-light">
                {discount}
              </div>
            )}
          </div>

          <div className="product-gallery h-full">
            {!!gallery?.length ? (
              <ThumbsCarousel gallery={[image, ...gallery]} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={image?.original ?? "/product-placeholder.svg"}
                  alt={name}
                  priority={true}
                  width={450}
                  height={450}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start md:w-1/2 p-5 lg:p-14 xl:p-16">
          <div className="w-full">
            <div className="flex">
              <h1 className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading">
                {name}
              </h1>
              <div className="ml-8 hidden">
                {product.product_condition === "new" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-green-500"
                  ></Badge>
                )}
                {product.product_condition === "good" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-yellow-500"
                  ></Badge>
                )}
                {product.product_condition === "very-good" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-green-500"
                  ></Badge>
                )}
                {product.product_condition === "recondition" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-green-500"
                  ></Badge>
                )}
              </div>
            </div>
            {mode === "user-product" && (
              <span className="text-small text-gray-400">
                Publier le {dayjs(updated_at).format("DD/MM/YYYY à HH:MM")}
              </span>
            )}
            {unit && isEmpty(variations) && (
              <span className="text-sm font-normal text-body mt-2 md:mt-3 block">
                {/*unit*/}
              </span>
            )}
            
            <div>
              <ProductAttributes
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </div>
            <DeliveryOptionView product={product} />
            <div className="flex items-center">
              <Tooltip tooltipText={"Les délais de livraison sont indicatifs de certaines commandes, susceptibles d'avoir des délais de livraison plus longs"} children={<InfoIcon height="16" width="16" />} />
              <DeliveryIcon height="42" width="42" />
              <div className="ml-4 flex">
                <p>
                  Livraison {product.price - product.discount > 35 && "GRATUITE"}{" "}</p>
                <p className=" ml-2 font-bold first-letter:capitalize">
                  {formatDateCompletWithDay(dateDelivery.toDateString())}
                </p>
              </div>

            </div>
            {quantity > 0 && (
              <div className="flex items-center text-green-500 mt-2 ml-2">
                <CheckMark height="24" width="24" />
                <div className="ml-4 ">En stock</div>
              </div>
            )}
            <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
              {quantity > 0 && (
                <>
                  {mode === "user-product" && (
                    <SendMessage
                      isCard={false}
                      data={product}
                      variant="big"
                      variation={selectedVariation}
                      disabled={selectedVariation?.is_disable || !isSelected}
                    />
                  )}
                  {mode !== "user-product" && (
                    <div className="mb-3 lg:mb-0 w-full lg:max-w-[400px]">
                      {dataMe?.me?.subscription?.status&&product?.exchangeable&&     <LinkButton href={"/click-games-plus/exchange/" + product?.slug} className="py-4 bg-green-500 hover:bg-green-800 px-5 mb-3 h-12 w-full break-all flex items-center justify-center text-sm lg:text-base  font-bold rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover"> <DataTransferIcon className="mr-2" height={20} width={20} /> <span className="ml-2"> Echanger avec click games +</span></LinkButton>}
                    </div>
                  )}
                </>
              )}

              {quantity > 0 ? (
                <>
                  {isEmpty(variations) && (
                    <span className="text-green-500 text-body whitespace-nowrap lg:ms-7">
                      {/*t("text-in-stock")*/}
                    </span>
                  )}
                  {!isEmpty(selectedVariation) && (
                    <span className="text-base text-body whitespace-nowrap lg:ms-7">
                      {
                        selectedVariation?.is_disable ||
                          selectedVariation.quantity === 0
                          ? t("text-out-stock")
                          : "" // t("text-in-stock")
                      }
                    </span>
                  )}
                </>
              ) : (
                <div className="text-base text-red-500 whitespace-nowrap">
                  {t("text-out-stock")}
                </div>
              )}
            </div>
          </div>

          {!!categories?.length ? (
            <ProductCategories
              categories={categories}
              basePath={`/${type?.slug}`}
            />
          ) : null}

          {shop?.name && (
            <div className="flex items-center mt-2 hidden">
              <span className="text-sm font-semibold text-heading capitalize me-6 py-1">
                {t("common:text-sellers")}
              </span>

              <button
                onClick={() => navigate(`${ROUTES.SHOPS}/${shop?.slug}`)}
                className="text-sm text-accent tracking-wider transition underline hover:text-accent-hover hover:no-underline"
              >
                {shop?.name}
              </button>
            </div>
          )}
          <div>
            <NoticeView product_id={product?.id as string} />
            {/** <button
              className="text-sm text-accent tracking-wider transition underline hover:text-accent-hover hover:no-underline"
              onClick={() =>
                openModal("NOTICE_LIST", { productId: product.id })
              }
            >
              Voir les avis
            </button>*/}
          </div>
        </div>
      </div>
      <Tab tabs={[{ name: "My Account", href: "#", current: true }]}>
        <div title="Détails">
          <Element
            name="details"
            className="py-4 mx-auto px-5 lg:px-16 lg:py-14 border-b border-border-200 border-opacity-70 lg:w-3/4"
          >
            <h2 className="text-lg text-heading tracking-tight font-semibold mb-4 md:mb-6">
              {t("text-details")}
            </h2>
            {/** <p className="text-sm text-body">{description}</p>*/}
            <div className="">
              <div
                className="html-content"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          </Element>
        </div>
        <div title="Avis" className="container mx-auto">
          <NoticeList productId={product.id} />
        </div>
      </Tab>
    </article>
  );
};

export default ProductDetailsExchange;
