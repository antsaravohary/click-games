import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { useSettings } from "@contexts/settings.context";
import { Coupon } from "@ts-types/generated";
import { useUpdateCouponMutation } from "@data/coupon/use-coupon-update.mutation";
import { useTranslation } from "next-i18next";
import FileInput from "@components/ui/file-input";
import { useCreateModelMessageMutation } from "@data/model-message/use-model-messages-create.mutation";
import TextArea from "@components/ui/text-area";
import { ModelMessage } from "@ts-types/model-messages-type";
import { useUpdateModelMessageMutation } from "@data/model-message/use-model-messages-update.mutation";
import Editor from "@components/form/Editor";
import { useState } from "react";
import Label from "@components/ui/label";


type FormValues = {
  title: string;
  content: string;
};

const defaultValues = {
  title: "",
  content: "",
};

type IProps = {
  initialValues?: ModelMessage | null;
};
export default function CreateOrUpdateModelMessageForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    // resolver: yupResolver(couponValidationSchema),
  });
  const [content, setContent] = useState(initialValues?.content);
  const { currency } = useSettings();
  const { mutate: createModelMessage, isLoading: creating } =
    useCreateModelMessageMutation();
  const { mutate: updateModelMessage, isLoading: updating } =
    useUpdateModelMessageMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      title: values?.title,
      content: content,
    };
    if (initialValues) {
      updateModelMessage(
        {
          variables: {
            id: initialValues.id!,
            input,
          },
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              setError(field, {
                type: "manual",
                message: error?.response?.data[field][0],
              });
            });
          },
        }
      );
    } else {
      createModelMessage(
        {
          variables: {
            input,
          },
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              setError(field, {
                type: "manual",
                message: error?.response?.data[field][0],
              });
            });
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:input-label-description")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Titre"
            {...register("title")}
            error={t(errors.title?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Label>Contenue</Label>
          <Editor
            name="description"
            value={content}
            onChange={(e: any) => {
              setContent(e);
            }}
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

        <Button loading={updating || creating}>
          {initialValues ? t("Mèttre à jour") : t("Crée")}
        </Button>
      </div>
    </form>
  );
}
