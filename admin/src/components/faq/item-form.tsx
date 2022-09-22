import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import Button from "@components/ui/button";
import Editor from "@components/form/Editor";
import Input from "@components/ui/input";
import { useTranslation } from "next-i18next";
import Trash from "@components/icons/trash";
export default function ItemForm({}) {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: "items",
    keyName:"key",
  });

  return (
    <div className="flex flex flex-wrap my-5 sm:my-8">
      <Description
        title={"Description"}
        details="Ajouter les differents section de votre article"
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />
      <div className="w-full sm:w-8/12 md:w-2/3 space-y-2">
        {fields?.map((field: any, index: number) => {
          return (
            <Card key={field.key} className="w-full">
              <div>
               
                <input {...register(`items.${index}.id`)} value={field.id} type="hidden" />
                <input
                  {...register(`items.${index}.type`)}
                  value="standard"
                  type="hidden"
                />
                <div className="flex justify-end">
                  <Button
                    size="small"
                    className="bg-red-600 mb-2 text-left -mr-6 -mt-6"
                    onClick={(e) => {e.preventDefault(); remove(index);}}
                  >
                    <Trash width="16" height="16" />
                  </Button>
                </div>

                <Input
                  label={t("form:input-label-title")}
                  {...register(`items.${index}.title`)}
                  error=""
                  variant="outline"
                  className="mb-5"
                />
                <Editor
                  name={`items.${index}.content`}
                  value={watch(`items.${index}.content`)}
                  onChange={(e) => setValue(`items.${index}.content`, e)}
                />
              </div>
            </Card>
          );
        })}
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            append({id:"",title:"",content:""});
          }}
          type="button"
        >
          Ajouter{" "}
        </Button>
      </div>
    </div>
  );
}
