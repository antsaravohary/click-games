import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { Control, useFormState, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useTranslation } from "next-i18next";
import { usePlatformsQuery } from "@data/platform/use-platforms.query";

interface Props {
  control: Control<any>;
  setValue: any;
}

const GamePlatformInput = ({ control, setValue }: Props) => {
  const { t } = useTranslation("form");
  const {errors } = useFormState({
    control,
  });


  const { data, isLoading: loading } = usePlatformsQuery({
    limit: 999,
    //type: type.slug,
  });
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-plaforms")}</Label>
      <SelectInput
        name="platforms"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={data?.platforms?.data}
        isLoading={loading}
      />
      {errors.platforms?.message && <p className="my-2 text-xs text-start text-red-500">{errors.platforms?.message}</p>}
    </div>
  );
};

export default GamePlatformInput;
