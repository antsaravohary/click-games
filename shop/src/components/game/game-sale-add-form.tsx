import FileInput from "@components/ui/file-input";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useGameSale } from "@contexts/game-sale.context";
import { AttachmentInput } from "@ts-types/generated";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, TextArea } from "..";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "next-i18next";
import { uniqueId } from "lodash";

type FormValue = {
  name: string;
  description: string;
  price: number;
  gallery: AttachmentInput[];
};

const schema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  description: yup.string().required("error-description-required"),
  price: yup
    .number()
    .typeError("form:error-price-must-number")
    .positive("form:error-price-must-positive")
    .required("form:error-price-required"),
  gallery: yup.array().min(1),
});
const GameSaleAddForm = () => {
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { closeModal } = useModalAction();
  const { addPurchaseProduct } = useGameSale();
  const { t } = useTranslation();
  const onSubmit = (values: FormValue) => {
    addPurchaseProduct({
      ...values,
      total_price: values?.price,
      quantity: 1,
      id: uniqueId(),
    });
    closeModal();
  };
  return (
    <div className="bg-white max-w-2xl  w-96 mx-auto p-8 md:rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-md font-semibold mb-5">
          AJouter votre produit à vendre
        </h3>
        {/**  <div className="mb-5 hidden">
          <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
            Platform
          </label>
          <SelectInput
            isLoading={isLoading}
            label={"Platform"}
            control={control}
            getOptionLabel={(option: Platform) => option?.name}
            getOptionValue={(option: Platform) => option?.id}
            name={"platform"}
            options={data?.platforms?.data ?? []}
          />
        </div>*/}

        <div className="mb-5">
          <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
            Quelle le nom de votre produit
          </label>
          <Input {...register("name")} error={t(errors.name?.message!)} />
        </div>
        <div className="mb-5">
          <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
            Dis nous un plus sur votre produit
          </label>
          <TextArea
            {...register("description")}
            error={t(errors.description?.message!)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
            Votre prix de vente
          </label>
          <Input {...register("price")} error={t(errors.price?.message!)} />
        </div>
        <div className="mb-5">
          <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
            Ajouter quelque photo de votre produit
          </label>
          <FileInput thumb_size={16} name="gallery" control={control} />
        </div>
        {isValid && (
          <div className="flex w-full justify-end">
            {" "}
            <Button className="mt-5" type="submit">
              Ajouter
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default GameSaleAddForm;
