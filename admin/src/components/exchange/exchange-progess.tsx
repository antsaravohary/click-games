
import { status_exchange } from "./data-exchange";

const getStep = (status: any) => {
  switch (status) {
    case "pending":
      return {
        label: "En attente de colis ...",
        value: 1,
      };
    case "fixing":
      return {
        label: "En cours de reparation...",
        value: 2,
      };
    case "to_pay":
      return {
        label: "En attente de paiement de facture ...",
        value: 3,
      };
      break;

    default:
      return {
        label: "...",
        value: 0,
      };
      break;
  }
};
export default function ExchangeProgress({ status }: any) {
  return (
    <div className="mt-5">
      <h4 className="sr-only">{status_exchange[status].label}</h4>
      <p className="text-sm font-medium text-gray-900">{status_exchange[status].text}</p>
      <div className="mt-2" aria-hidden="true">
        <div className="bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-accent rounded-full"
            style={{ width: `${(status_exchange[status].value * 100) / status_exchange.total}%` }}
          />
        </div>
        <div className="hidden sm:gdrid grid-cols-4 text-sm font-medium text-gray-600 mt-6"></div>
      </div>
    </div>
  );
}
