import Card from "@components/ui/card";
import Label from "@components/ui/label";
import SelectInput from "@components/ui/select-input";
import { useGameSale } from "@contexts/game-sale.context";
import { useForm } from "react-hook-form";
import { Button, Input } from "..";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import Description from "@components/ui/description";
import AddressSelectInput from "@components/address/address-select-input";
import PaymentInfo from "@components/bank/payment-info";
import { useCustomerQuery } from "@data/customer/use-customer.query";

type FormValue = {
  shipping_company: {
    label: string;
    value: string;
  };
  sender_address: {};
  tracking_number: string;
  tracking_url: string;
  weight: string;
};
const schematValidation = yup.object().shape({
  shipping_company: yup
    .object()
    .typeError("Entreprise de livraison requis!")
    .required("Entreprise de livraison requis!"),
  tracking_number: yup.string().required("Numero de suivi requis!"),
  weight: yup
    .number()
    .typeError("Le poid doit être un nombre")
    .positive("Veuillez entrer un nombre positif")
    .required("Poid requis!"),
});
const shippingCompanyData = [
  { label: "La poste", value: "La poste" },
  { label: "Colissimo", value: "Colissimo" },
  { label: "UPS", value: "UPS" },
  { label: "Fedex", value: "Fedex" },
];
const GameToSaleStep2 = () => {
  const { setStep, setShipping, shipping } = useGameSale();
  const { data } = useCustomerQuery();
  const { t } = useTranslation();
  const onSubmit = (values: FormValue) => {
    setShipping(values);
    setStep(3);
  };
  return (
    <>
      <section aria-labelledby="cart-heading mt-5">
        <PaymentInfo user={data?.me} />
        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <button
            onClick={() => setStep(3)}
            type="submit"
            className="w-full bg-accent border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            Suivant
          </button>
        </div>
      </section>
    </>
  );
};
export default GameToSaleStep2;
