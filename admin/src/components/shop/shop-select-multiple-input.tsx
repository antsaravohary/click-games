import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { Control, useFormState, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useShopsQuery } from "@data/shop/use-shops.query";
import { useMeQuery } from "@data/user/use-me.query";

interface Props {
  control: Control<any>;
  setValue: any;
}

const ShopSelectMutlipleInput = ({ control, setValue }: Props) => {
  const { t } = useTranslation("common");
  const type = useWatch({
    control,
    name: "type",
  });

  const {
    query: { shop },
    locale,
  } = useRouter();
  const { data, isLoading: loading, error } = useMeQuery();

  const { dirtyFields } = useFormState({
    control,
  });
 /* useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue("categories", []);
    }
  }, [type?.slug]);*/

  return (
    <div className="mb-5">
      <Label>Boutique à gérer</Label>
      <SelectInput
        name="shops"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={data?.shops}
        isLoading={loading}
      />
    </div>
  );
};

export default ShopSelectMutlipleInput;
