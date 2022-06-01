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
type SelectType = {
  label: string;
  value: any;
};
type FormValue = {
  type: any;
  status: any;
  brand: SelectType;
  modele: SelectType;
  color: any;
  year: any;
  milage: SelectType;
  licence: any;
  fuel: SelectType;
  age: any;
  storage_capacity: SelectType;
};
type props = {
  nextStep: any;
  previousStep: any;
  update: any;
  product: Product;
};
const Step2 = ({ nextStep, previousStep, update, product }: props) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { isValid },
  } = useForm<FormValue>({
    mode: "onChange",
    defaultValues: {
    ...product
    },
  });
  const onSubmit = (values: FormValue) => {
    update(
      values
    );
    nextStep();
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-4xl mx-auto mt-4 bg-white rounded p-4">
          <h4 className="font-semi-bold text-lg">Dis nous plus!</h4>
          <div className="flex mt-4">
            <div className="grid grid-cols-6 gap-6 w-full">
              {product?.categories &&
                product?.categories[1]?.champs_required?.map((champ) => (
                  <RenderChampsRequired
                    key={champ.value}
                    register={register}
                    product={product}
                    champ={champ}
                    control={control}
                  />
                ))}
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

export default Step2;
