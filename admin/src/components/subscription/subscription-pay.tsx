/* This example requires Tailwind CSS v2.0+ */
import { CheckMark } from "@components/icons/checkmark";
import PaymentForm from "@components/payment/payement-form";
import PaymentGroup from "@components/payment/payement-group";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useShopQuery } from "@data/shop/use-shop.query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const includedFeatures = [
  "3% de commission",
  "Visibilité de vos produits",
  "Ressources des collaborateurs",
  "Diffusion de produit Gagnant",
];


export default function SubscriptionPay() {
  const { openModal, closeModal } = useModalAction();
  const { data } = useModalState();
  const onPaySuccess = () => {
    data.onSuccess();
    closeModal();
  };
  const router = useRouter();
  const {
    query: { shop },
  } = router;
  const { data: shopData } = useShopQuery(shop as string);
  const shopId = shopData?.shop?.id!;
  return (
    <>
      <div className="relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none ">
            <div className="flex-1 bg-white px-6 py-8 lg:p-12">
              <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Abonnement Click Univers
              </h3>

              <div className="mt-8">
                <div className="flex items-center">
                  <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                    Ce qui est inclu
                  </h4>
                  <div className="flex-1 border-t-2 border-gray-200" />
                </div>
                <ul
                  role="list"
                  className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                >
                  {includedFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start lg:col-span-1"
                    >
                      <div className="flex-shrink-0">
                        <CheckMark width="16" heigth="16" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
              <p className="text-lg leading-6 font-medium text-gray-900">
                Paiement par mois
              </p>
              <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                <span>36.99€</span>
                <span className="ml-3 text-xl font-medium text-gray-500">
                  /mois
                </span>
              </div>
              <p className="mt-2 text-sm text-italic px-8 text-gray-500">
                Si vous n'êtes pas satisfait, contactez-nous dans les 14
                premiers jours et nous vous enverrons un remboursement complet
              </p>
              <p className="mt-4 text-sm">
                <a href="#" className="font-medium text-gray-500 underline"></a>
              </p>
              <div className="mt-6">
                <PaymentForm amount={36.99}  onPaySuccess={onPaySuccess}   type="subscription" data={{shopId:shopId,type:"subscription",price_id:"price_1Jmx4vJSHiQBbnaw4vyLBSsh",action:"subscription"}}/>
                {/** <Elements stripe={stripePromise}>
                  <PaymentGroup
                    type="subscription"
                    data={{shopId:shopId}}
                    amount={35}
                    onPaySuccess={onPaySuccess}
                    onCardAdd={() => openModal("SUBSCRIPTION_PAY")}
                  />
                </Elements>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
