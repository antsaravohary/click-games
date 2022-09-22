import Input from "@components/ui/input";
import {
  Control,
  FieldErrors,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Button from "@components/ui/button";

import Card from "@components/common/card";
import Description from "@components/ui/description";

import { useRouter } from "next/router";
import { tagIcons } from "./tag-icons";
import { useTranslation } from "next-i18next";

import { yupResolver } from "@hookform/resolvers/yup";

import { FaqValidationSchema } from "./faq-validation-schema";
import { useEffect, useState } from "react";
import ItemForm from "./item-form";
import Editor from "@components/form/Editor";
import { useCreateFaqMutation } from "@data/faq/use-faq-create.mutation";
import { useUpdateFaqMutation } from "@data/faq/use-faq-update.mutation";

type FormValues = {
  subject: string;
  content: string;
};

const defaultValues = {
  subject: "",
  content: "",
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateFaqForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          icon: initialValues?.icon
            ? tagIcons.find(
                (singleIcon) => singleIcon.value === initialValues?.icon!
              )
            : "",
        }
      : defaultValues,

    resolver: yupResolver(FaqValidationSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = methods;

  const { mutate: createFaq, isLoading: creating } = useCreateFaqMutation();
  const { mutate: updateFaq, isLoading: updating } = useUpdateFaqMutation();

  const onSubmit = async (values: FormValues) => {
    if (initialValues) {
      updateFaq({
        variables: {
          id: router.query.faqId as string,
          input: {
            subject: values.subject,
            content: values.content,
          },
        },
      });
    } else {
      createFaq({
        variables: {
          input: {
            subject: values.subject,
            content: values.content,
          },
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("form:input-label-description")}
            details={`${
              initialValues
                ? t("form:item-description-edit")
                : t("form:item-description-add")
            } ${t("form:tag-description-helper-text")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:input-label-title")}
              {...register("subject")}
              error={t(errors.subject?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Editor
              name={`content`}
              value={watch(`content`)}
              onChange={(e: string) => setValue(`content`, e)}
            />
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
            {initialValues
              ?"Mettre à jour"
              :"Ajouter"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
