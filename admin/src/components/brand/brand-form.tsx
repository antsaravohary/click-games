import Input from "@components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { getIcon } from "@utils/get-icon";
import * as typeIcons from "@components/icons/type";
import { typeIconList } from "./group-icons";
import { useTranslation } from "next-i18next";
import { Brand } from "@ts-types/brand-type";
import { useCreateBrandMutation } from "@data/brand/use-brand-create.mutation";
import { useUpdateBrandMutation } from "@data/brand/use-brand-update.mutation";
import Trash from "@components/icons/trash";
import SelectInput from "@components/ui/select-input";
import { brand_types } from "@utils/data";
import Label from "@components/ui/label";
import { PlusIcon } from "@components/icons/plus-icon";
import { CloseIcon } from "@components/icons/close-icon";
import RepairPriceForm from "./repair-price-form";

export const updatedIcons = typeIconList.map((item: any) => {
  item.label = (
    <div className="flex space-s-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {getIcon({
          iconList: typeIcons,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});
type Modele = {
  id: number | undefined;
  name: string;
};
type FormValues = {
  name: string;
  modeles: Modele[];
  type: {};
};

type IProps = {
  initialValues?: Brand | null;
  category_id?: number;
};
export default function CreateOrUpdateBrandForm({
  initialValues,
  category_id,
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: initialValues
      ? {
          ...initialValues,
          type: brand_types.find((b) => initialValues?.type === b.value),
        }
      : {},
  });
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "modeles",
    keyName: "key",
  });
  const modeles = watch("modeles");
  const { mutate: createBrand, isLoading: creating } = useCreateBrandMutation();
  const { mutate: updateBrand, isLoading: updating } = useUpdateBrandMutation();
  const onSubmit = async (values: FormValues) => {
    if (!initialValues) {
      createBrand({
        variables: {
          input: {
            name: values.name,
            category_id: 5,
            type: values?.type?.value,
            //category_id: category_id as number,
            modeles: values.modeles,
          },
        },
      });
    } else {
      updateBrand({
        variables: {
          id: initialValues.id!,
          input: {
            name: values.name,
            category_id: 5,
            type: values?.type?.value,
            //category_id: category_id as number,
            modeles: values.modeles,
          },
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:item-description")}
          details={`${
            initialValues
              ? t("form:item-description-update")
              : t("form:item-description-add")
          } ${t("form:type-description-help-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label>Type</Label>
            <SelectInput control={control} name="type" options={brand_types} />
          </div>
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
        </Card>
      </div>

      {fields.map((field, index) => (
        <div key={field.key} className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={
              modeles[index]?.name === ""
                ? "Nouvelle Modele"
                : modeles[index]?.name
            }
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="flex justify-between">
              <input
                {...register(`modeles[${index}].id`)}
                value={field.id}
                type={"hidden"}
              />
              <Input
                label={t("form:input-label-name")}
                {...register(`modeles[${index}].name`)}
                error={t(errors.name?.message!)}
                variant="outline"
                className="mb-5 w-full"
              />

              <button
                className="ml-5"
                onClick={() => {
                  remove(index);
                }}
              >
                <Trash color="red" width={24} />
              </button>
            </div>
            <RepairPriceForm
              control={control}
              name={`modeles[${index}].repair_prices`}
              register={register}
            />
          </Card>
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          onClick={(e) => {
            e.preventDefault();
            append({ name: "" });
          }}
          size="medium"
        >
        + Ajouter un model
        </Button>
      </div>
      <div className="flex justify-end ">
        <div className="mt-5 mb-4  w-full flex  sm:w-8/12 md:w-2/3">
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

          <Button className="flex-1" loading={creating || updating}>
            Enregistrer
          </Button>
        </div>
      </div>
    </form>
  );
}
