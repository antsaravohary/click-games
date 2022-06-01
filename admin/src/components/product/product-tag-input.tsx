
import Label from "@components/ui/label";
import { Control, useFormState, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTagsQuery } from "@data/tag/use-tags.query";
import { useTranslation } from "next-i18next";
import CreatableInput from "@components/ui/creatable-input";
import { useCreateTagMutation } from "@data/tag/use-tag-create.mutation";

interface Props {
  control: Control<any>;
  setValue: any;
}

const ProductTagInput = ({ control, setValue }: Props) => {
  const { t } = useTranslation();
  const type = useWatch({
    control,
    name: "type",
  });
  const { dirtyFields,errors } = useFormState({
    control,
  });
  const [options, setOptions] = useState<any>([]);
  const { mutate: createTag } = useCreateTagMutation(false);
  /*useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue("tags", []);
    }
  }, [type?.slug]);*/

  const { data, isLoading: loading } = useTagsQuery({
    limit: 999,
    //type: type.slug,
  });
  useEffect(() => {
    setOptions(data?.tags?.data);
  }, [data]);

  const handleChange = (newValue: any, value: any) => {
    console.log("pprrrooss", newValue);
  };
  const handleCreate=(value:string)=>{
    createTag({variables:{
     input:{
      name: value,
      details: "values.details",
      type_id: 1,
     }
    },});
  }

  return (
    <div>
      <Label>{t("sidebar-nav-item-tags")}</Label>
      <CreatableInput
        name="tags"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={options}
        handleChange={handleChange}
        handleCreate={handleCreate}
        isLoading={loading}
      />
           {errors.tags?.message && <p className="my-2 text-xs text-start text-red-500">{errors.tags?.message}</p>}
    </div>
  );
};

export default ProductTagInput;
