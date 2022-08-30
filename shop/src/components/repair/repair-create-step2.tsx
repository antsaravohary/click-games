import { Button } from "..";
import * as yup from "yup";
import { useRepair } from "@contexts/repair.context";
import { useAddressQuery } from "@data/address/use-address.query";
import { formatAddress } from "@utils/format-address";
import Address from "@components/address/address";
import { useCustomerQuery } from "@data/subscription/use-customer.query";
import {  Address as TAddress } from "@ts-types/generated";
import { useState } from "react";

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
const RepairCreateStep2 = () => {
  const { setStep, setShipping, shipping, setShippingAddress } = useRepair();
  const { data } = useAddressQuery({
    id: "1",
  });
  const { data: dataMe } = useCustomerQuery();
  const [sendAddress, setSendAddress] = useState<TAddress | undefined>();
  const onValide=()=>{
    setShipping({ sender_address:sendAddress});
    setStep(3);
  }
  return (
    <>
      <section aria-labelledby="cart-heading mt-5">
        <h2 id="cart-heading" className="mt-5">
          Livraison de vos jeux
        </h2>
        <p className="text-sm mt-2">
          Vous devez livrer votre console à l'adresse suivant pour la reparation
        </p>
        <div className="mr-8 rounded-sm border mt-2  p-2 text-sm">
          <div>{data?.address && formatAddress(data?.address?.address)}</div>
          <div>Télephone: {data?.address?.telephone}</div>
        </div>

        <div className="mb-5 mt-5">
          <Address
            id={dataMe?.me?.id!}
            me={dataMe?.me}
            onSelect={(e: TAddress) => {
              setSendAddress(e);
            }}
            heading="Adresse retour colis"
            addresses={dataMe?.me?.address}
            count={0}
            type="billing"
          />
        </div>

        {sendAddress ? (
          <div className="flex justify-center">
            <Button onClick={onValide} type="submit" className="mt-5 w-full">
              Suivant
            </Button>
          </div>
        ) : null}
      </section>
    </>
  );
};
export default RepairCreateStep2;
