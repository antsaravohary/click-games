import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import FileInput from "@components/ui/file-input";
import TextArea from "@components/ui/text-area";
import { shopValidationSchema } from "./shop-validation-schema";
import { getFormattedImage } from "@utils/get-formatted-image";
import { useCreateShopMutation } from "@data/shop/use-shop-create.mutation";
import { useUpdateShopMutation } from "@data/shop/use-shop-update.mutation";
import {
  BalanceInput,
  ShopSettings,
  ShopSocialInput,
  UserAddressInput,
} from "@ts-types/generated";
import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import Label from "@components/ui/label";
import { getIcon } from "@utils/get-icon";
import SelectInput from "@components/ui/select-input";
import * as socialIcons from "@components/icons/social";
import omit from "lodash/omit";
import { useModalAction } from "@components/ui/modal/modal.context";
import { IbanValidation } from "@utils/iban";
import { useEffect } from "react";
import SelectAutoComplete from "@components/ui/SelectAutoComplete";
import axios from "axios";
import { error } from "console";
import SwitchInput from "@components/ui/switch-input";
import Trash from "@components/icons/trash";
import { useDeleteShopMutation } from "@data/shop/use-shop-delete.mutation";
import { useRouter } from "next/router";

const socialIcon = [
  {
    value: "FacebookIcon",
    label: "Facebook",
  },
  {
    value: "InstagramIcon",
    label: "Instagram",
  },
  {
    value: "TwitterIcon",
    label: "Twitter",
  },
  {
    value: "YouTubeIcon",
    label: "Youtube",
  },
];

export const updatedIcons = socialIcon.map((item: any) => {
  item.label = (
    <div className="flex space-s-4 items-center text-body">
      <span className="flex w-4 h-4 items-center justify-center">
        {getIcon({
          iconList: socialIcons,
          iconName: item.value,
          className: "w-4 h-4",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type FormValues = {
  name: string;
  description: string;
  cover_image: any;
  haswebsite: boolean;
  logo: any;
  balance: BalanceInput;
  address: UserAddressInput;
  settings: ShopSettings;
};

const ShopForm = ({ initialValues }: { initialValues?: any }) => {
  const { mutate: createShop, isLoading: creating } = useCreateShopMutation();
  const { mutate: updateShop, isLoading: updating } = useUpdateShopMutation();
  const { mutate: deleteShop, isLoading: deleting } = useDeleteShopMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    setError,
    control,
  } = useForm<FormValues>({
    shouldUnregister: true,
    ...(initialValues
      ? {
          defaultValues: {
            ...initialValues,
            logo: getFormattedImage(initialValues.logo),
            cover_image: getFormattedImage(initialValues.cover_image),
            settings: {
              ...initialValues?.settings,
              socials: initialValues?.settings?.socials
                ? initialValues?.settings?.socials.map((social: any) => ({
                    icon: updatedIcons?.find(
                      (icon) => icon?.value === social?.icon
                    ),
                    url: social?.url,
                  }))
                : [],
            },
          },
        }
      : {}),
    resolver: yupResolver(shopValidationSchema),
  });
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "settings.socials",
  });
  const { openModal } = useModalAction();
  const iban = watch("balance.payment_info.account");
  useEffect(() => {
    if (iban != "" && !IbanValidation(iban)) {
      setError("balance.payment_info.account", {
        type: "manual",
        message: "Iban invalide",
      });
    } else {
      setError("balance.payment_info.account", { type: "", message: "" });
    }
  }, [iban]);

  function onSubmit(values: FormValues) {
    console.log("values", values);
    const editBank =
      values?.balance?.payment_info?.account !==
        initialValues?.balance?.payment_info.account ||
      values?.balance?.payment_info?.email !==
        initialValues?.balance?.payment_info.email ||
      values?.balance?.payment_info?.name !==
        initialValues?.balance?.payment_info.name ||
      values?.balance?.payment_info?.bank !==
        initialValues?.balance?.payment_info.bank;

    const settings = {
      ...values?.settings,
      location: { ...omit(values?.settings?.location, "__typename") },
      socials: values?.settings?.socials
        ? values?.settings?.socials?.map((social: any) => ({
            icon: social?.icon?.value,
            url: social?.url,
          }))
        : [],
    };
    if (initialValues?.name) {
      const { ...restAddress } = values.address;

      const u = () => {
        updateShop({
          variables: {
            id: initialValues.id,
            input: {
              ...values,
              address: restAddress,
              settings,
              balance: {
                id: initialValues.balance?.id,
                ...values.balance,
              },
            },
          },
        });
      };
      if (editBank) {
        openModal("CONFIRM_PASSWORD", { update: u });
      } else {
        u();
      }
    } else {
      createShop({
        variables: {
          input: {
            ...values,
            settings,
            balance: {
              ...values.balance,
            },
          },
        },
      });
    }
  }

  const coverImageInformation = (
    <span>
      {t("form:shop-cover-image-help-text")} <br />
      {t("form:cover-image-dimension-help-text")} &nbsp;
      <span className="font-bold">1170 x 435{t("common:text-px")}</span>
    </span>
  );
  const handleDeleteShop = () => {
    openModal("CONFIRM_PASSWORD", {
      update: () => {
        deleteShop(initialValues.id, {
          onSuccess: () => {
            router.push("/");
          },
        });
        router;
      },
    });
  };
  const selectAddress = (i: { value: string }) => {
    axios
      .get(
        "https://geo.api.gouv.fr/communes/" +
          i.value +
          "?fields=nom,code,codesPostaux,centre,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre"
      )
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        setValue("address.city", data.nom.toUpperCase());
        setValue("address.zip", data.codesPostaux[0]);
        setValue("address.state", data.departement.nom);
        /* setFieldValue("lng", data.codesPostaux[0]);
      setFieldValue("lat", data.centre.coordinates[1]);*/
        /*setFieldValue("placeId", i.value);*/
      })
      .catch((err) => console.log("erreur", err));
  };

  const loadOptions = (
    val: string | any[] | ((prevState: never[]) => never[])
  ) => {
    let params = "";
    let find = false;
    if (isNaN(Number(val))) {
      params = "nom";
      if (val.length >= 3) {
        find = true;
      }
    } else {
      params = "codePostal";
      if (val.length >= 5) {
        find = true;
      }
    }
    if (find) {
      return axios
        .get("https://geo.api.gouv.fr/communes?" + params + "=" + val)
        .then((response) => {
          return response.data.map(
            (item: { nom: string; codesPostaux: string[]; code: any }) => {
              return {
                label:
                  item.nom.toUpperCase() + " (" + item.codesPostaux[0] + ")",
                value: item.code,
              };
            }
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:input-label-logo")}
            details={t("form:shop-logo-help-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="logo" control={control} multiple={false} />

            <p className="my-2 text-xs text-start text-red-500">
              {errors?.logo?.message!}
            </p>
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:shop-cover-image-title")}
            details={coverImageInformation}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="cover_image" control={control} multiple={false} />
            <p className="my-2 text-xs text-start text-red-500">
              {errors?.cover_image?.message!}
            </p>
          </Card>
        </div>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:shop-basic-info")}
            details={t("form:shop-basic-info-help-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:input-label-name")}
              {...register("name")}
              variant="outline"
              className="mb-5"
              error={t(errors.name?.message!)}
            />
            <TextArea
              label={t("form:input-label-description")}
              {...register("description")}
              variant="outline"
              error={t(errors.description?.message!)}
            />
          </Card>
        </div>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          <Description
            title={t("form:shop-payment-info")}
            details={t("form:payment-info-helper-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:input-label-account-holder-name")}
              {...register("balance.payment_info.name")}
              variant="outline"
              className="mb-5"
              error={t(errors.balance?.payment_info?.name?.message!)}
            />
            <Input
              label={t("form:input-label-account-holder-email")}
              {...register("balance.payment_info.email")}
              variant="outline"
              className="mb-5"
              error={t(errors.balance?.payment_info?.email?.message!)}
            />
            <Input
              label={t("form:input-label-bank-name")}
              {...register("balance.payment_info.bank")}
              variant="outline"
              className="mb-5"
              error={t(errors.balance?.payment_info?.bank?.message!)}
            />
            <Input
              label={t("form:input-label-account-number") + "*"}
              {...register("balance.payment_info.account", {
                required: true,
                validate: IbanValidation,
              })}
              variant="outline"
              error={
                errors.balance?.payment_info?.account?.type &&
                "Numero de compte Invalide"
              }
            />
          </Card>
        </div>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          <Description
            title={t("form:shop-address")}
            details={t("form:shop-address-helper-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:input-label-country")}
              defaultValue="France"
              readOnly={true}
              {...register("address.country")}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.country?.message!)}
            />

            <SelectAutoComplete
              placeholder="Saisir votre code postal"
              loadOptions={loadOptions}
              onChange={selectAddress}
            />
            {watch("address.city") && (
              <Input
                label={t("form:input-label-city")}
                {...register("address.city")}
                variant="outline"
                className="mb-5"
                error={t(errors.address?.city?.message!)}
              />
            )}
            {watch("address.state") && (
              <Input
                label={t("form:input-label-state")}
                {...register("address.state")}
                variant="outline"
                className="mb-5"
                error={t(errors.address?.state?.message!)}
              />
            )}
            {watch("address.zip") && (
              <Input
                label={t("form:input-label-zip")}
                {...register("address.zip")}
                variant="outline"
                className="mb-5"
                error={t(errors.address?.zip?.message!)}
              />
            )}

            <TextArea
              label={t("form:input-label-street-address")}
              {...register("address.street_address")}
              variant="outline"
              error={t(errors.address?.street_address?.message!)}
            />
          </Card>
        </div>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          <Description
            title={t("form:shop-settings")}
            details={t("form:shop-settings-helper-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            {/* <div className="mb-5">
              <Label>{t("form:input-label-autocomplete")}</Label>
              <Controller
                control={control}
                name="settings.location"
                render={({ field: { onChange } }) => (
                  <GooglePlacesAutocomplete
                    onChange={onChange}
                    data={getValues("settings.location")!}
                  />
                )}
              />
                </div>*/}
            <Input
              label={t("form:input-label-contact")}
              {...register("settings.contact")}
              variant="outline"
              className="mb-5"
              error={t(errors.settings?.contact?.message!)}
            />
            <SwitchInput
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              label="Site internet : Oui / Non"
              control={control}
              errors={errors?.haswebsite?.message}
              {...register("haswebsite")}
            />

            {watch("haswebsite") && (
              <Input
                label={t("form:input-label-website")}
                {...register("settings.website")}
                variant="outline"
                className="mb-5"
                error={t(errors.settings?.website?.message!)}
              />
            )}
            <div>
              {fields.map(
                (item: ShopSocialInput & { id: string }, index: number) => (
                  <div
                    className="border-b border-dashed border-border-200 first:border-t last:border-b-0 first:mt-5 md:first:mt-10 py-5 md:py-8"
                    key={item.id}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                      <div className="sm:col-span-2">
                        <Label>{t("form:input-label-select-platform")}</Label>
                        <SelectInput
                          name={`settings.socials.${index}.icon` as const}
                          control={control}
                          options={updatedIcons}
                          isClearable={true}
                          defaultValue={item?.icon!}
                        />
                      </div>
                      {/* <Input
                        className="sm:col-span-2"
                        label={t("form:input-label-icon")}
                        variant="outline"
                        {...register(`settings.socials.${index}.icon` as const)}
                        defaultValue={item?.icon!} // make sure to set up defaultValue
                      /> */}
                      <Input
                        className="sm:col-span-2"
                        label={t("form:input-label-url")}
                        variant="outline"
                        {...register(`settings.socials.${index}.url` as const)}
                        defaultValue={item.url!} // make sure to set up defaultValue
                      />
                      <button
                        onClick={() => {
                          remove(index);
                        }}
                        type="button"
                        className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                      >
                        {t("form:button-label-remove")}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
            <Button
              type="button"
              onClick={() => append({ icon: "", url: "" })}
              className="w-full sm:w-auto"
            >
              {t("form:button-label-add-social")}
            </Button>
          </Card>
        </div>

        <div className="mb-5 text-end">
          <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            {initialValues?.name
              ? t("form:button-label-update")
              : t("form:button-label-save")}
          </Button>
        </div>
      </form>

      {initialValues?.name && (
        <div className="mb-5 text-start">
          <Button onClick={handleDeleteShop} loading={deleting} className="bg-red-500 hover:bg-red-800">
            <Trash width="16" height="16" /> Supprimer ma boutique
          </Button>
        </div>
      )}
    </>
  );
};

export default ShopForm;
