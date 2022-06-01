import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@components/ui/link";
import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
import { Permission } from "@ts-types/generated";
import { useRegisterMutation } from "@data/user/use-register.mutation";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  siret: string;
  password: string;
  permission: Permission;
};
const registrationFormSchema = yup.object().shape({
  first_name: yup.string().required("form:error-name-required"),
  last_name: yup.string(),
  siret:yup.string()
  .required("form:error-siret-required")
  .matches(/^[0-9]+$/, "form:error-siret-must-number")
  .min(14, 'form:error-siret-must-number')
  .max(14, 'form:error-siret-must-number'),
  email: yup
    .string()
    .email("form:error-email-format")
    .required("form:error-email-required"),
  password: yup.string().required("form:error-password-required"),
  permission: yup.string().default("store_owner").oneOf(["store_owner"]),
});
const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: {
      permission: Permission.StoreOwner,
    },
  });
  const router = useRouter();
  const { t } = useTranslation();

  async function onSubmit({ first_name,last_name, email, password, permission,siret }: FormValues) {
    registerUser(
      {
        variables: {
          first_name,
          last_name,
          email,
          siret,
          password,
          permission,
        },
      },

      {
        onSuccess: ({ data }) => {
          if (data?.token) {
            if (hasAccess(allowedRoles, data?.permissions)) {
              setAuthCredentials(data?.token, data?.permissions);
              router.push(ROUTES.DASHBOARD);
              return;
            }
            setErrorMessage("form:error-enough-permission");
          } else {
            setErrorMessage("form:error-credential-wrong");
          }
        },
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t("form:input-label-name")}
          {...register("first_name")}
          variant="outline"
          className="mb-4"
          error={t(errors?.last_name?.message!)}
        />
        <Input
          label={t("form:input-label-last-name")}
          {...register("last_name")}
          variant="outline"
          className="mb-4"
          error={t(errors?.last_name?.message!)}
        />
        <Input
          label="SIRET"
          {...register("siret")}
          type="text"
          variant="outline"
          className="mb-4"
          error={t(errors?.siret?.message!)}
        />
        <Input
          label={t("form:input-label-email")}
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-4"
          error={t(errors?.email?.message!)}
        />
        <PasswordInput
          label={t("form:input-label-password")}
          {...register("password")}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
        />
        <p className="text-sm text-gray-600 my-2 text-center">En vous inscrivant, vous acceptez les <Link className="text-accent" href="https://www.click-univers.com/terms" target="_blank">Termes & Conditions</Link> de Click Univers terms</p>
        <Button className="w-full" loading={loading} disabled={loading}>
          {t("form:text-register")}
        </Button>

        {errorMessage ? (
          <Alert
            message={t(errorMessage)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMessage(null)}
          />
        ) : null}
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t("common:text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t("form:text-already-account")}{" "}
        <Link
          href={ROUTES.LOGIN}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
        >
          {t("form:button-label-login")}
        </Link>
      </div>
    </>
  );
};

export default RegistrationForm;
