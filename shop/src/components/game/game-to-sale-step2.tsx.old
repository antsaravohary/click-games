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

type FormValue = {
  shipping_company: {
    label: string;
    value: string;
  };
  sender_address:{}
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
  const { setStep, setShipping,shipping } = useGameSale();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    mode: "onChange",
    defaultValues:shipping,
    resolver: yupResolver(schematValidation),
  });
  const { t } = useTranslation();
  const onSubmit = (values: FormValue) => {
    setShipping(values);
    setStep(3);
  };
  return (
    <>
      <section aria-labelledby="cart-heading mt-5">
        <h2 id="cart-heading" className="mt-5">
          Livraison de vos jeux
        </h2>
        <p className="text-sm mt-2">
          Vous devez livrer vos à l'adresse suivant pour avoir le paiement, une
          fois nous aurrons vos paquet nous debiterons votre compte
        </p>
        <div className="mr-8 rounded-sm border mt-2  p-2 text-sm">
          <div>Audin court, France</div>
          <div>Télephone: +261327670811</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Description
            title="Remplir les information de livraison"
            className="w-full"
          />
          <Card className="w-full">
            <div className="mb-5">
              <Label>Votre adresse</Label>
              <AddressSelectInput name="sender_address" control={control} />{" "}
            </div>
            <div className="mb-5">
              <Label>Nom de la société transporteur*</Label>
              <SelectInput
                name="shipping_company"
                control={control}
                options={shippingCompanyData}
                isClearable={true}
              />
              <p className="text-red-500">
                {errors?.shipping_company?.message}
              </p>
            </div>
            <Input
              label="Numéro de suivi *"
              {...register("tracking_number")}
              error={t(errors.tracking_number?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label="Lien de suivi"
              {...register("tracking_url")}
              error={t(errors.tracking_url?.message!)}
              className="mb-5"
            />
            <Input
              label="Poid [Kg]"
              defaultValue="0.00"
              {...register("weight")}
              error={t(errors.weight?.message!)}
              className="mb-5"
            />
          </Card>
          {isValid ? (
            <div className="flex justify-center">
              <Button type="submit" className="mt-5 w-full">
                Suivant
              </Button>
            </div>
          ) : null}
        </form>
      </section>
    </>
  );
};
export default GameToSaleStep2;
