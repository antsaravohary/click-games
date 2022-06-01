import Input from "@components/ui/input";
import {
  Control,
  FieldErrors,
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import * as categoriesIcon from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import { useRouter } from "next/router";
import ValidationError from "@components/ui/form-validation-error";
import { useEffect } from "react";
import { Category } from "@ts-types/generated";
import { useTypesQuery } from "@data/type/use-types.query";
import { PromotionType } from "@ts-types/promotion-type.types";
import { useTranslation } from "react-i18next";
import { PromotionTypeValidationSchema } from "./promotion-type-validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePromotionTypeMutation } from "@data/promotion-type/use-promotion-type-create.mutation";
import { useUpdatePromotionTypeMutation } from "@data/promotion-type/use-promotion-type-update.mutation";
import FileInput from "@components/ui/file-input";

type FormValues = {
  image: any;
  title: string;
  description: string;
  max_product: number;
  price: number;
  options: any;
};
const defaultValues = {
  image: [],
  title: "",
  description: "",
  price: "",
  max_product: 1,
  options: [],
};

type IProps = {
  initialValues?: PromotionType | null;
};
export default function CreateOrUpdatePromotionTypeForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    // shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
  });

  const { mutate: createPromotionType, isLoading: creating } =
    useCreatePromotionTypeMutation();
  const { mutate: updatePromotionType, isLoading: updating } =
    useUpdatePromotionTypeMutation();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "options", // unique name for your Field Array
      // keyName: "id", default to "id", you can change the key name
    }
  );
  const onSubmit = async (values: FormValues) => {
    const input = { ...values };
    if (initialValues) {
      updatePromotionType({
        variables: {
          id: initialValues?.id,
          input: {
            ...input,
          },
        },
      });
    } else {
      createPromotionType({
        variables: {
          ...input,
          image: {
            thumbnail: values?.image?.thumbnail,
            original: values?.image?.original,
            id: values?.image?.id,
          },
        },
      });
    }
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("form:input-label-image")}
          details={t("form:promotion-type-image-helper-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:input-label-description")}
          details={`${
            initialValues
              ? t("form:item-description-edit")
              : t("form:item-description-add")
          } ${t("form:category-description-helper-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Title"
            {...register("title")}
            error={t(errors.title?.message!)}
            variant="outline"
            className="mb-5"
          />

          <TextArea
            label="Description"
            {...register("description")}
            variant="outline"
            className="mb-5"
          />
          <Input
            label="Nombre de produit"
            {...register("max_product")}
            error={t(errors.max_product?.message!)}
            variant="outline"
            type="number"
            className="mb-5"
          />
          <Input
            label="Prix"
            {...register("price")}
            error={t(errors.price?.message!)}
            variant="outline"
            type="number"
            className="mb-5"
          />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title="Options"
          details={`${
            initialValues
              ? t("form:item-description-edit")
              : t("form:item-description-add")
          } ${t("form:category-description-helper-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          {fields.map((field, index) => (
            <Input key={field.id} {...register(`options.${index}.value`)} />
          ))}
          <div className="mt-2">
            <Button
              onClick={(e: any) => {
                e.preventDefault();
                append({});
              }}
              type="button"
            >
              {t("form:button-label-add-option")}
            </Button>
          </div>
        </Card>
      </div>
      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t("form:button-label-back")}
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues ? "Mettre à jour" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
