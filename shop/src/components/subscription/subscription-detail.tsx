import PaymentCardInfo from "@components/payment/payment-card-info";
import Loader from "@components/ui/loader/loader";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { UseStripeCardQuery } from "@data/stripe/use-stripe-cards.query";
import { formatDateComplet } from "@utils/format-date";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
dayjs.locale()


const SubscriptionDetail = () => {
  const { data } = useCustomerQuery();
  const subscription = data?.me?.subscription;
  const { data: cardData, isLoading: loadingData } = UseStripeCardQuery(subscription?.payment_method_id);
  const { t } = useTranslation("common");
  return (
    <div className="w-full bg-light">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-base font-semibold text-accent uppercase tracking-wide">
            Abonnement
          </h1>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            CLICK GAMES +
          </p>
        </div>
        <div className="mt-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Détails d'abonnement
          </h3>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">Click Games +</span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Période</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{formatDateComplet(subscription?.current_period_start)} au {formatDateComplet(subscription?.current_period_end)}</span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Statut</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{subscription?.status ? "Active" : "Desactive"}</span>
              </dd>
            </div>
            {subscription?.type == "CLICK_GAMES_PLUS" && <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Moyen de paiement</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {loadingData ? <Loader simple className="h-6 w-6" /> : <PaymentCardInfo card={cardData} />}
              </dd>
            </div>}

          </dl>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
