import Card from "@components/common/card";
import { CubeIcon } from "@components/icons/shops/cube";
import { DollarIcon } from "@components/icons/shops/dollar";
import { FacebookIcon, InstagramIcon } from "@components/icons/social";
import PaymentForm from "@components/payment/payement-form";
import PaymentGroup from "@components/payment/payement-group";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Input from "@components/ui/input";
import { useModalAction } from "@components/ui/modal/modal.context";
import { usePromotionTypesQuery } from "@data/promotion-type/use-promotion-types.query";
import { useCreatePromotionMutation } from "@data/promotion/use-promotion-creaate.mutation";
import { useShopQuery } from "@data/shop/use-shop.query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Product } from "@ts-types/generated";
import { PromotionType } from "@ts-types/promotion-type.types";
import { ROUTES } from "@utils/routes";
import usePrice from "@utils/use-price";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PromotionProductListForm from "./promotion-product-list-form";

type DataPrice = {
  title: string;
  description: string;
  price: number;
  max_product: number;
  options: Array<String>;
};
const data_prices: DataPrice[] = [
  {
    title: "BASIC",
    description: "",
    price: 4.99,
    max_product: 5,
    options: ["Facebook"],
  },
  {
    title: "STANDARD",
    description: "",
    max_product: 10,
    price: 4.99,
    options: ["Facebook", "Instagram"],
  },
  {
    title: "PREMIUM",
    description: "",
    max_product: 15,
    price: 4.99,
    options: ["Facebook"],
  },
];
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);
const CreatePromotionForm = () => {
  const { openModal } = useModalAction();
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<any>();
  const [products, setProducts] = useState<Array<Product>>([]);
  const [delay, setDelay] = useState<number>(1);
  const router = useRouter();
  const {
    query: { shop },
  } = router;
  const [promotionType, setPromotionType] = useState<
    undefined | PromotionType
  >();
  const { data: shopData } = useShopQuery(shop as string);
  const shopId = shopData?.shop?.id!;
  const handleDelay = (e: any) => {
    if (e.currentTarget.value > 0) {
      setDelay(e.currentTarget.value);
    }
  };
  const calculPrice = () => {
    const { price } = usePrice({
      amount: promotionType ? delay * promotionType.price : 0,
    });
    return price;
  };
  const { mutate: createPromotion } = useCreatePromotionMutation();

  const handlePay = () => {
    if (promotionType) {
      createPromotion(
        {
          variables: {
            input: {
              products: products,
              promotion_type_id: promotionType?.id,
              delay: delay,
              shop_id: shopId,
            },
          },
        },
        {
          onSuccess: (data) => {
            setStep(2);
            setData(data.data);
          },
        }
      );
    }
  };
  useEffect(() => {
    if (promotionType && promotionType.max_product < products.length) {
      setProducts(products.slice(0, promotionType.max_product));
    }
  }, [promotionType]);
  return (
    <div>
      <div>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title="Type de promotion"
            details="Sélectionnez un type de promotion attribuer sur votre produit"
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="w-full flex flex-col p-8 flex justify-center items-center border border-dashed">
              {promotionType && (
                <div className="flex w-full flex-wrap mb-4 justify-center">
                  <div className="border border-gray-100 w-[150px]">
                    <div className="flex items-center mt-auto px-4 h-full">
                      <p className="text-lg font-semibold text-sub-heading my-auto">
                        {promotionType.title}
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-100 w-[150px] ">
                    <div className="flex items-center py-3 px-4">
                      <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                        <DollarIcon width={12} />
                      </div>

                      <div className="ml-3">
                        <p className="text-lg font-semibold text-sub-heading mb-0.5">
                          {promotionType.price} €
                        </p>
                        <p className="text-sm text-muted mt-0">par jour</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-100 w-[150px] ">
                    <div className="flex items-center py-3 px-4">
                      <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#183891] text-light">
                        <CubeIcon width={18} />
                      </div>

                      <div className="ml-3">
                        <p className="text-lg font-semibold text-sub-heading mb-0.5">
                          {promotionType.max_product} Produits
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-100 w-[150px] ">
                    <div className="flex items-center justify-center py-4 px-4 space-x-3">
                      {promotionType.options.some((s) => s === "Facebook") && (
                        <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#183891] text-light">
                          <FacebookIcon width={18} />
                        </div>
                      )}
                      {promotionType.options.some((s) => s === "Instagram") && (
                        <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#f1bc0e] text-light">
                          <InstagramIcon width={18} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {step === 1 && (
                <>
                  <Button
                    onClick={() =>
                      openModal("PROMOTION_PRICE_TABLE_FORM", {
                        setValue: (e: any) => setPromotionType(e),
                        data_prices: data_prices,
                      })
                    }
                    name="price"
                    variant="normal"
                  >
                    {promotionType ? "Changer" : "Choisir une promotion"}
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title="Produit"
            details="Veuillez ajouter votre produit à mèttre en promotion"
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            {step === 1 && (
              <div className="flex justify-end w-full mt-0">
                <Button
                  className="mb-4"
                  onClick={() =>
                    openModal("PRODUCT_CHOICE_FORM", {
                      products,
                      setProducts,
                      max_product: promotionType
                        ? promotionType.max_product
                        : 0,
                    })
                  }
                  variant="outline"
                  size="small"
                >
                  Ajouter des produit
                </Button>
              </div>
            )}

            <h3 className="text-md mb-2">
              Listes des produits à mèttre en promotion
            </h3>
            <PromotionProductListForm
              products={products}
              setProducts={setProducts}
            />
            <div className="w-full flex flex-col  flex justify-center items-center border border-dashed"></div>
          </Card>
        </div>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title="Validitée"
            details="Veuillez entrer le nombre de jour de votre promotion"
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={`Nombre de jours*`}
              type="number"
              name="delay"
              readOnly={step !== 1}
              value={delay}
              onChange={handleDelay}
              variant="outline"
              className="mb-5"
            />
            <div className="align">Montant total: {calculPrice()}</div>
            {/*step === 1 && (
              <div className="flex w-full justify-end">
                <Button
                  onClick={handlePay}
                  className="place-self-end"
                  name="pay"
                >
                  Payer
                </Button>
              </div>
            )*/}
            {promotionType && products.length && (
              <PaymentForm 
              data={{
                action: "promotion_pay",
                products: products,
                promotion_type_id: promotionType?.id,
                delay: delay,
                shop_id: shopId,
              }}
              type="simple"
              
              onPaySuccess={()=>router.push(shop+"/"+ROUTES.PROMOTION)}
              amount={promotionType ? delay * promotionType.price : 0}/>
             
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePromotionForm;
