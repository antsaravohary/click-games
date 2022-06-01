import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { useFormContext } from "react-hook-form";
import Card from "@components/common/card";
import ValidationError from "@components/ui/form-validation-error";
import { ProductType } from "@ts-types/generated";
import { useTranslation } from "next-i18next";

export const productConditions = [
  { name: "Très bon", value: "very-good" },
  { name: "Bon", value: "good" },
  { name: "Reconditionné", value: "recondition" },
];

const ProductConditionInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  return (
  
      <div className="mb-5">
        <Label>{"Etat du produit d'occasion"}</Label>
        <SelectInput
          name="product_condition"
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={productConditions}
        />
          {errors.product_condition?.message && <p className="my-2 text-xs text-start text-red-500">{errors.product_condition?.message}</p>}
        
      </div>
  
  );
};

export default ProductConditionInput;
