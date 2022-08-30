import Card from "@components/ui/card";
import Description from "@components/ui/description";
import Label from "@components/ui/label";
import { useModalAction, useModalState } from "@components/ui/modal/modal.context";
import SelectInput from "@components/ui/select-input";
import { useRepair } from "@contexts/repair.context";
import { useAddressQuery } from "@data/address/use-address.query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "..";
type FormValue = {
  company: {
    label: string;
    value: string;
  };
  tracking_number: string;
  tracking_url: string;
  weight: string;
};
const schematValidation = yup.object().shape({
  company: yup
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
const DeliveryForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    mode: "onChange",
    resolver: yupResolver(schematValidation),
  });
  const {
    data: { onValide },
  } = useModalState();
  const {closeModal}=useModalAction();
  const { t } = useTranslation();
  const onSubmit = (values: FormValue) => {
    onValide({...values,company:values?.company?.value});
    closeModal();
  };
  return (
    <div className="bg-white p-8 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Description
          title="Remplir les information de livraison"
          className="w-full"
        />
        <Card className="w-full">
          <div className="mb-5">
            <Label>Nom de la société transporteur*</Label>
            <SelectInput
              name="company"
              control={control}
              options={shippingCompanyData}
              isClearable={true}
            />
            <p className="text-red-500">{errors?.company?.message}</p>
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
    </div>
  );
};

export default DeliveryForm;
