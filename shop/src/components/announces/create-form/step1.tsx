import Input from "@components/ui/input";
import CategoryChoice from "@components/category/category-choice";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Radio from "@components/ui/radio/radio";
import { AnimateSharedLayout, motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { fadeInTop } from "@utils/motion/fade-in-top";
type FormValue = {
  name?: string;
  categories: [];
  type: string;
};
type props = {
  nextStep: any;
  previousStep: any;
  update: any;
  product: any;
};
const validationSchema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  categories: yup.array().min(2, "Categories requis !"),
});
const Step1 = ({ nextStep, previousStep, update, product }: props) => {
  const {
    register,
    handleSubmit,
    setValue,

    control,
    watch,
    formState: { isValid },
  } = useForm<FormValue>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      categories: product?.categories,
      name: product?.name,
    },
  });
  const onSubmit = (values: any) => {
    update(values);
    nextStep();
  };
//  const categories = watch("categories");
 
  console.log("is valide", isValid);
  return (
    <>
      <AnimateSharedLayout>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-4xl mx-auto mt-4 bg-white rounded p-4">
            <h4 className="font-semi-bold text-lg">
              Commençons par l’essentiel !
            </h4>
            <div className="flex mt-4">
              <div className="flex-1">
                <Input
                  className="w-96"
                  label="Quel est le titre de l’annonce ?"
                  {...register("name")}
                  dimension="small"
                  variant="outline"
                />
              </div>
            </div>
            <div className="flex mt-4">
              <div className="">
                <CategoryChoice setValue={setValue} control={control} defaultCategory={product?.categories[0]} defaultChildCategory={product?.categories[1]} />
              </div>
              {/**{categories?.length > 1 && (
                <div className="flex space-x-2 items-center ml-4">
                  {categories[1]?.types?.some((t) => t.slug === "offre") && (
                    <Radio
                      {...register("type")}
                      id="draft"
                      label={"Offre"}
                      value="offre"
                    />
                  )}
                  {categories[1]?.types?.some((t) => t.slug === "demande") && (
                    <Radio
                      {...register("type")}
                      label="Demande"
                      id="published"
                      value="ask"
                      className=""
                    />
                  )}
                </div>
              )} */}
            </div>
            <div className="mt-4 flex justify-end">
              {isValid && <Button type="submit">Suivant</Button>}
            </div>
          </div>
        </form>
      </AnimateSharedLayout>
    </>
  );
};

export default Step1;
