import Input from "@components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Brand } from "@ts-types/brand-type";
import { useCreateBrandMutation } from "@data/brand/use-brand-create.mutation";
import Trash from "@components/icons/trash";
import { Game } from "@ts-types/games-type";
import { useUpdateBrandMutation } from "@data/brand/use-brand-update.mutation";
import { useCreateGameMutation } from "@data/game/game-create.mutation";
import { yupResolver } from "@hookform/resolvers/yup";
import { GameValidationSchema } from "./game-validation-schema";
import { usePlatformsQuery } from "@data/platform/use-platforms.query";
import GamePlatformInput from "./game-platform-input";
import TextArea from "@components/ui/text-area";

type Modele = {
  id: number | undefined;
  name: string;
};
type FormValues = {
  name: string;
  description: string;
  quantity: number;
  year: number;
  buy_price: number;
  sale_price: number;
  platform: any;
};

type IProps = {
  initialValues?: Game | null;
};
export default function CreateOrUpdateGameForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(GameValidationSchema),
  });
  const { data: dataPlatform } = usePlatformsQuery({ orderBy: "id" });

  const { mutate: createGame, isLoading: creating } = useCreateGameMutation();
  const { mutate: updateBrand, isLoading: updating } = useUpdateBrandMutation();
  const onSubmit = async (values: FormValues) => {
    console.log(values);
    if (!initialValues) {
      createGame({
        name: values?.name,
        year: values?.year,
        description: values?.description,
        platform_id: 1,
        buy_price: values?.buy_price,
        sale_price: values?.sale_price,
        quantity: 0,
      });
    } else {
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:item-description")}
          details={`${
            initialValues
              ? t("form:item-description-update")
              : t("form:item-description-add")
          } ${t("form:game-description-help-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
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
            label={t("form:input-label-year")}
            {...register("year")}
            error={t(errors.year?.message!)}
            variant="outline"
            className="mb-5"
          />

          <GamePlatformInput control={control} setValue={""} />
          <TextArea
            label={t("form:input-label-description")}
            {...register("description")}
            error={errors.description?.message}
          />
          <Input
            label={t("form:input-label-quantity")}
            {...register("quantity")}
            error={t(errors.quantity?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t("form:input-label-buy-price")}
            {...register("buy_price")}
            error={t(errors.buy_price?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t("form:input-label-sale-price")}
            {...register("sale_price")}
            error={t(errors.sale_price?.message!)}
            variant="outline"
            className="mb-5"
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
            ? t("form:button-label-update-group")
            : t("form:button-label-add-group")}
        </Button>
      </div>
    </form>
  );
}
