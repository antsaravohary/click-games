import MasterCard from "./image/master-card.png";
import Paypal from "./image/paypal.png";
import Visa from "./image/visa.png";
const PaymentCardInfo = ({ card }: any) => {
  const logo: any =
    (card.card.brand === "paypal" && Paypal) ||
    (card.card.brand === "master" && MasterCard) ||
    (card.card.brand === "visa" && Visa);
  return (
    <div className="sm:flex sm:items-start">
        <img className={`h-6 w-auto sm:flex-shrink-0 sm:h-4`} src={logo.src} />
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <div className="text-sm font-medium text-gray-900">
        **** **** **** {card?.card?.last4}
        </div>
        <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
          <div>Date d'expiration: {card?.card?.exp_month}/{card?.card?.exp_year}</div>
          <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
            &middot;
          </span>
        </div>
      </div>
    </div>
  );
};
export default PaymentCardInfo;