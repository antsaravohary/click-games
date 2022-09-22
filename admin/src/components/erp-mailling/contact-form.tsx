import Input from "@components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";
import { tagIcons } from "./tag-icons";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArticleValidationSchema } from "./article-validation-schema";
import { useCreateArticleMutation } from "@data/article/use-tag-create.mutation";
import { useUpdateArticleMutation } from "@data/article/use-article-update.mutation";
import { ContactValidationSchema } from "./contact-validation-schema";
import Button from "@components/ui/button";
import { useContactMutation } from "@data/contact/use-contact-create.mutation";

type FormValues = {
  name: string;
  email: string;
};

type IProps = {
  initialValues?: any;
};
export default function CreateContactForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm<FormValues>({
    resolver: yupResolver(ContactValidationSchema),
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

  const { mutate: createContact, isLoading: creating } = useContactMutation();

  const onSubmit = async (values: FormValues) => {
    createContact({
      variables: {
        input: {
          name: values.name,
          email: values.email,
        },
      },
    });
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
              label={t("form:input-label-name")}
              {...register("name")}
              error={t(errors.name?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label="Email"
              {...register("email")}
              error={t(errors.email?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Button disabled={creating} loading={creating}
           type="submit"
            >
              {initialValues ? "Mettre à jour" : "Ajouter"}
            </Button>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}
