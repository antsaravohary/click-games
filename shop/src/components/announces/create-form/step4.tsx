import Input from "@components/ui/input";
import CategoryChoice from "@components/category/category-choice";
import { useForm, useFormState } from "react-hook-form";
import Button from "@components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Radio from "@components/ui/radio/radio";
import Label from "@components/ui/label";
import { Product } from "@ts-types/custom.types";
import RenderChampsRequired from "./renderChampsRequired";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "next-i18next";
type FormValue = {
  price: number;
};
type props = {
  nextStep: any;
  previousStep: any;
  update: any;
  product: Product;
};
const validationSchema = yup.object().shape({
  price: yup
    .number()
    .typeError("form:error-price-must-number")
    .positive("form:error-price-must-positive")
    .required("form:error-price-required"),
});
const Step4 = ({ nextStep, previousStep, update, product }: props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      price: product?.price,
    },
  });
  const onSubmit = (values: any) => {
    update(values);
    nextStep();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-4xl mx-auto mt-4 bg-white rounded p-4">
          <h4 className="font-semi-bold text-lg">Quel est votre prix ?</h4>
          <div className="flex mt-4">
            <div className="mt-1 relative rounded-md shadow-sm">
              <Input
                className="w-96"
                suffix="€"
                label="Votre prix de vente"
                {...register("price")}
                dimension="small"
                variant="outline"
                error={t(errors.price?.message!)}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Button onClick={previousStep}>Retour</Button>
            <Button type="submit">Suivant</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Step4;
