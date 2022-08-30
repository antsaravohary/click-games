import Card from "@components/ui/card";
import * as yup from "yup";
import { IbanValidation } from "@utils/iban";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Button, Input } from "..";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { User } from "@ts-types/generated";
import { toast } from "react-toastify";
import { Lock } from "@components/icons/lock";
import { LockOpen } from "@components/icons/lock-open";
import { useState } from "react";
type Props = {
  user: User;
}
type FormValue = {
  name: string;
  email: string;
  bank: string;
  account: string;
};
const schemaValidation = yup.object().shape({
  name: yup.string().required("Nom requis!"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  bank: yup.string().required("Banque requis!"),
});

const PaymentInfo = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },

  } = useForm<FormValue>({
    resolver: yupResolver(schemaValidation),
    defaultValues: user?.balance?.payment_info
  });
  const { t } = useTranslation("common");
  const { mutate: updateProfile, isLoading: loading } =
    useUpdateCustomerMutation();
  const [edit, setEdit] = useState(false);

  return (
    <>
      <Card className="w-full mt-12">
        <div className="w-full pt-1 pb-5">
          <div className="bg-accent text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            {!edit ? <Lock onClick={() => setEdit(true)} className="cursor-pointer" width="48" heigth="48" /> : <LockOpen width="48" heigth="48" />}
          </div>
        </div>
        <div className="mb-2">
          <h1 className="text-center font-bold text-xl uppercase">
            Coordonnées bancaire
          </h1>
        </div>

        <form onSubmit={handleSubmit((values) => {
          updateProfile({
            id: user.id,
            payment_info: values,
          },
            {
              onSuccess: () => {
                toast.success(t("payment-info-update-successful"));
                setEdit(false)
              },
            })
        })}>
          <Input
            label={t("input-label-account-holder-name")}
            {...register("name")}
            variant="outline"
            disabled={!edit}
            className="mb-5"
            error={t(errors.name?.message!)}
          />
          <Input
            label={t("input-label-account-holder-email")}
            {...register("email")}
            variant="outline"
            disabled={!edit}
            className="mb-5"
            error={t(errors.email?.message!)}
          />
          <Input
            label={t("input-label-bank-name")}
            {...register("bank")}
            variant="outline"
            className="mb-5"
            disabled={!edit}
            error={t(errors.bank?.message!)}
          />
          <Input
            label={t("input-label-account-number") + "*"}
            {...register("account", {
              required: true,
              validate: IbanValidation,
            })}
            disabled={!edit}
            variant="outline"
            error={errors.account?.type && "Numero de compte Invalide"}
          />
          {edit && <div className="flex justify-end mt-5">
            <Button loading={loading} type="submit">Enregistrer</Button>
          </div>}
        </form>
      </Card>
    </>
  );
};
export default PaymentInfo;
