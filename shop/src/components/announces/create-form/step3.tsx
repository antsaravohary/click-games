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
type FormValue = {
  name: string;
  description: Number;
};
type props = {
  nextStep: any;
  previousStep: any;
  update: any;
  product: Product;
};
const validationSchema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  description:yup.string().required("error-description-required"),
});
const Step3 = ({ nextStep, previousStep, update, product }: props) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: product?.name,
      description:product?.description
    },
  });
  const onSubmit = (values: any) => {
    update(values);
    nextStep();
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-4xl mx-auto mt-4 bg-white rounded p-4">
          <h4 className="font-semi-bold text-lg">Décrivez votre bien !</h4>
          <div className="flex mt-4">
            <div className="flex-1">
              <Input
                className="w-96"
                label="Titre de l'annonce"
                {...register("name")}
                dimension="small"
                variant="outline"
              />
            </div>
          </div>
          <div className="flex mt-4">
            <TextArea className="w-full" label="Description de l'annonce" {...register("description")}/>
          </div>
          <p className="text-xs">
            Nous vous rappelons que la vente de contrefaçons est interdite.
            Mentionnez bien dans votre annonce que votre produit est un
            original. Indiquez dans le texte de l’annonce si vous proposez un
            droit de rétractation à l’acheteur. En l’absence de toute mention,
            l’acheteur n’en bénéficiera pas et ne pourra pas demander le
            remboursement ou l’échange du bien ou service proposé
          </p>
          <div className="mt-4 flex justify-between">
            <Button onClick={previousStep}>Retour</Button>
            <Button type="submit">Suivant</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Step3;
