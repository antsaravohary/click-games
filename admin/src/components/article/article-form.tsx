import Input from "@components/ui/input";
import {
  Control,
  FieldErrors,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Button from "@components/ui/button";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import * as categoriesIcon from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import { useRouter } from "next/router";
import ValidationError from "@components/ui/form-validation-error";
import { tagIcons } from "./tag-icons";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypesQuery } from "@data/type/use-types.query";
import { ArticleValidationSchema } from "./article-validation-schema";
import { useCreateArticleMutation } from "@data/article/use-tag-create.mutation";
import Editor from "@components/form/Editor";
import { useEffect, useState } from "react";
import ItemForm from "./item-form";
import { useUpdateArticleMutation } from "@data/article/use-article-update.mutation";
import Trash from "@components/icons/trash";
import { remove } from "js-cookie";
import Checkbox from "@components/ui/checkbox/checkbox";

function SelectTypes({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();
  const { data: types, isLoading: loading } = useTypesQuery();
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-types")}</Label>
      <SelectInput
        name="type"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.slug}
        options={types?.types!}
        isLoading={loading}
      />
      <ValidationError message={t(errors.type?.message)} />
    </div>
  );
}

export const updatedIcons = tagIcons.map((item: any) => {
  item.label = (
    <div className="flex space-s-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {getIcon({
          iconList: categoriesIcon,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type FormValues = {
  title: string;
  slug: string;
  type: string;
  items: [{ id?: string; title: string; content: string }];
  notif:boolean;
};

const defaultValues = {
  title: "",
  slug: "",
  type: "",
  items: [],
  notif:false,
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateArticleForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [editorLoaded, setEditorLoaded] = useState(false);
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

    resolver: yupResolver(ArticleValidationSchema),
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

  const { mutate: createArticle, isLoading: creating } =
    useCreateArticleMutation();
  const { mutate: updateArticle, isLoading: updating } =
    useUpdateArticleMutation();

  const onSubmit = async (values: FormValues) => {
    if (initialValues) {
      updateArticle({
        variables: {
          id: router.query.articleId as string,
          input: {
            title: values.title,
            slug: values.slug,
            type:"rules",
            notif:values?.notif,
            items: values.items.map((item) => ({
              id: item?.id,
              title: item?.title,
              type:"standard",
              content: item?.content,
            })),
          },
        },
      });
    } else {
      createArticle({
        variables: {
          input: {
            title: values.title,
            notif:values?.notif,
            slug: values.slug,
            type:"rules",
            items: values.items.map((item) => ({
              title: item?.title,
              type:"standard",
              content: item?.content,
            })),
          },
        },
      });
    }
  };
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
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
              {...register("title")}
              error={t(errors.title?.message!)}
              variant="outline"
              className="mb-5"
            />
            <input {...register(`type`)} value="standard" type="hidden" />
            <Input
              label="Slug"
              {...register("slug")}
              error={t(errors.slug?.message!)}
              variant="outline"
              className="mb-5"
            />
          
          </Card>
         
        </div>

        <ItemForm />
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Notification d'utilisateur")}
            details="Cochez si vous souhaitez avertir tous les utilisateurs de la création ou modification de cette article"
            className="w-full px-0 sm:pe-4 md:pe-5  sm:w-4/12 md:w-1/3 "
          />
        <Card className="w-full sm:w-8/12 md:w-2/3"> 
        <Checkbox label="Notifier les utilisateurs" {...register("notif")}/>
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
              ? t("form:button-label-update-article")
              : t("form:button-label-add-article")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
