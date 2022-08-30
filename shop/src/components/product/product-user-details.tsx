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
import { ProductUserInfo } from "./product-details/product-user-info";
import { ProductUserInformationSup } from "./product-details/product-user-information-sup";

type Props = {
  product: any;
  variant?: "defaultView" | "modalView";
};

const ProductUserDetails: React.FC<Props> = ({ product }) => {
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

  /**
   *
   * {size: "Large", color: "Black", weight: "1kg"}
   */
  return (
    <article className="rounded-lg bg-light">
      <div className="flex flex-col md:flex-row">
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
              <ThumbsCarousel gallery={gallery} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={image?.original ?? "/product-placeholder.svg"}
                  alt={name}
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
              <div className="ml-8">
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

            <div className="my-2  flex items-center">
              {!isEmpty(variations) ? (
                <VariationPrice
                  selectedVariation={selectedVariation}
                  minPrice={product.min_price}
                  maxPrice={product.max_price}
                />
              ) : (
                <span className="flex items-center">
                  <ins className="text-2xl md:text-3xl font-semibold text-accent no-underline">
                    {basePrice ? basePrice : price}
                  </ins>
                  {discount && (
                    <del className="text-sm md:text-base font-normal text-muted ms-2">
                      {price}
                    </del>
                  )}
                </span>
              )}
            </div>

            <div>
              <ProductAttributes
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </div>
            <DeliveryOptionView product={product} />
            <div className="mt-4 flex flex-row ">
              {quantity > 0 && (
                <SendMessage
                  isCard={false}
                  data={product}
                  variant="big"
                  variation={selectedVariation}
                />
              )}
            </div>
            <div className="mt-4  flex flex-row ">
              <ProductUserInfo />
            </div>
          </div>

          {!!categories?.length ? (
            <ProductCategories
              categories={categories}
              basePath={`/${type?.slug}`}
            />
          ) : null}

          {shop?.name && (
            <div className="flex items-center mt-2">
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
      <div className="flex flex-col md:flex-row border-b border-border-200 border-opacity-70">
        <div className="md:w-1/2 p-6 pt-2 lg:p-14 xl:p-16 border-t border-border-200">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 border-b border-gray-200">
              Description
            </h3>
            <div className="mt-5 ">
              <ProductUserInformationSup product={product} />
              {description && (
                <div className="mt-3 md:mt-4 text-body text-sm text-gray-900 space-y-5">
                  <Truncate
                    character={450}
                    onClick={scrollDetails}
                    buttonText="En savoir plus"
                  >
                    {description.replace(/<[^>]*>?/gm, "")}
                  </Truncate>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductUserDetails;
