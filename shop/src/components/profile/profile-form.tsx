import Button from "@components/ui/button";
import Card from "@components/ui/card";
import FileInput from "@components/ui/file-input";
import Input from "@components/ui/input";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { User } from "@ts-types/generated";
import pick from "lodash/pick";

interface Props {
  user: User;
}

type UserFormValues = {
  name?: User["name"];
  last_name?: User["name"];
  first_name?: User["name"];
  profile?: User["profile"];
};

const ProfileForm = ({ user }: Props) => {
  const { t } = useTranslation("common");
  const { register, handleSubmit, setValue, control } = useForm<UserFormValues>(
    {
      defaultValues: {
        ...(user &&
          pick(user, [
            "name",
            "first_name",
            "last_name",
            "profile.bio",
            "profile.contact",
            "profile.avatar",
          ])),
      },
    }
  );
  const { mutate: updateProfile, isLoading: loading } =
    useUpdateCustomerMutation();
  function onSubmit(values: any) {
    updateProfile(
      {
        id: user.id,
        //first_name: values.first_name,
        //last_name: values.last_name,
        profile: {
          id: user?.profile?.id,
          ...values.profile,
          avatar: values.profile.avatar?.[0],
        },
      },
      {
        onSuccess: () => {
          toast.success(t("profile-update-successful"));
        },
      }
    );
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex mb-8">
        <Card className="w-full">
         {/***  <div className="mb-8">
            <FileInput control={control} name="profile.avatar" />
          </div>*/}

          <div className="flex flex-col sm:space-y-0 space-y-5 sm:flex-row sm:space-s-4 mb-6">
            <Input
              className="flex-1"
              readOnly={true}
              label={t("text-name")}
              {...register("first_name")}
              variant="outline"
            />
            <Input
              className="flex-1"
              readOnly={true}
              label={t("text-last-name")}
              {...register("last_name")}
              variant="outline"
            />
            <Input
              {...register("profile.contact")}
              label={t("text-contact-number")}
              className="flex-1"
              onChange={(e) => {
                const value = maskPhoneNumber(e.target.value);
                //@ts-ignore
                setValue("profile.contact", value);
              }}
              variant="outline"
            />
          </div>

         {/** <TextArea
            label={t("text-bio")}
            //@ts-ignore
            {...register("profile.bio")}
            variant="outline"
            className="mb-6"
          /> */}

          <div className="flex">
            <Button className="ms-auto" loading={loading} disabled={loading}>
              {t("text-save")}
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
};

export default ProfileForm;
