import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "@ts-types/custom.types";
import { useTranslation } from "next-i18next";
import FileInput from "@components/ui/file-input";
import { AttachmentInput } from "@ts-types/generated";
import { array } from "yup/lib/locale";
type FormValue = {
  gallery: AttachmentInput[];
  image:AttachmentInput;
};
type props = {
  nextStep: any;
  previousStep: any;
  update: any;
  product: Product;
};
const validationSchema = yup.object().shape({
});
const Step5 = ({ nextStep, previousStep, update, product }: props) => {
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
      gallery:product?.gallery
    },
  });
  const onSubmit = (values: any) => {
    update(values);
    nextStep();
    
  };
  const gallery=watch("gallery");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-4xl mx-auto mt-4 bg-white rounded p-4">
          <div className="m-2 p-2 bg-yellow-200 rounded font-semibold">
            <h3> 3 photos c’est bien… 10 photos c’est mieux ! </h3>
            <h3>Surtout quand c’est gratuit.</h3>
            <h3>
              Profitez-en pour prendre votre bien en photo sous toutes les
              coutures !
            </h3>
          </div>
          <FileInput thumb_size={32}  name="gallery" control={control}   />
          <div className="flex flex-wrap h-full">
         
          </div>

          <div className="mt-4 flex  justify-between">
            <Button onClick={previousStep}>Retour</Button>
            <Button type="submit">Suivant</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Step5;
