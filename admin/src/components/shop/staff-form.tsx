import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useAddStaffMutation } from "@data/user/use-add-staff.mutation";
import ShopSelectMutlipleInput from "./shop-select-multiple-input";
import { Shop, User } from "@ts-types/generated";
import { useUpdateStaffMutation } from "@data/user/use-staff-update.mutation";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  shops: any[];
};
type IProps = {
  initialValues?: User | null;
};
const defaultValues = {
  first_name: "",
  last_name:"",
  email: "",
  password: "",
  shops: [],
};

const staffFormSchema = yup.object().shape({
  first_name: yup.string().required("form:error-name-required"),
  last_name: yup.string().nullable(),
  email: yup
    .string()
    .email("form:error-email-format")
    .required("form:error-email-required"),
  password: yup.string().required("form:error-password-required"),
});
const AddStaffForm = ({ initialValues }: IProps) => {
  const router = useRouter();

  const {
    query: { shop },
  } = router;
  const { data: shopData } = useShopQuery(shop as string);
  const shopId = shopData?.shop?.id!;
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? {
          email: initialValues?.email,
          first_name: initialValues?.first_name,
          last_name: initialValues?.last_name,
          password: "**********",
          shops: initialValues?.managed_shops as any[],
        }
      : defaultValues,
    resolver: yupResolver(staffFormSchema),
  });

  const { mutate: addStaff, isLoading: loading } = useAddStaffMutation();
  const { mutate: updateStaff, isLoading: updating } = useUpdateStaffMutation();
  const { t } = useTranslation();

  function onSubmit({ first_name,last_name, email, password, shops }: FormValues) {
    if (initialValues) {
      updateStaff({
        variables: {
          id: router.query.id,
          input: {
            first_name,
            last_name,
            email,
            password,
            shop_id: Number(shopId),
            shops: shops.map((s: any) => s.id),
          },
        },
      });
    } else {
      addStaff(
        {
          variables: {
            first_name,
            last_name,
            email,
            password,
            shop_id: Number(shopId),
            shops: shops.map((s: any) => s.id),
          },
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              setError(field, {
                type: "manual",
                message: error?.response?.data[field],
              });
            });
          },
        }
      );
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={t("form:form-description-staff-info")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nom"
            {...register("first_name")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.first_name?.message!)}
          />
            <Input
            label="Prénom"
            {...register("last_name")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.last_name?.message!)}
          />
          <Input
            label={t("form:input-label-email")}
            {...register("email")}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <PasswordInput
            label={t("form:input-label-password")}
            {...register("password")}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
          />
          <ShopSelectMutlipleInput control={control} setValue={setValue} />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {initialValues?"Mise à jour":t("form:button-label-add-staff")}
        </Button>
      </div>
    </form>
  );
};

export default AddStaffForm;
