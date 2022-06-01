import { PencilIcon } from "@components/icons/pencil-icon";
import SelectInput from "@components/ui/select-input";
import { useRepair } from "@contexts/repair.context";
import { useBrandQuery } from "@data/brand/use-brand.query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "..";

type FormValue = {
  brand: { label: string; value: string };
  model_brand: {};
};

export default function RepairSelectModel() {
  const { data: dataBrand, isLoading: loadingBrand } = useBrandQuery({
    type: "console",
  });
  const { setModel, brand: sbrand, model_brand: smodel_brand } = useRepair();
  const [edit, setEdit] = useState(smodel_brand ? false : true);
  const { control, watch, handleSubmit } = useForm<FormValue>();
  const brand = watch("brand");
  const model_brand = watch("model_brand");
  const onSubmit = (values: FormValue) => {
    setModel(values);
    setEdit(false);
  };

  if (!edit) {
    return (
      <div className="flex">
        <h3 className="text-md font-semibold mb-5">
          Reparation de {sbrand.label} model {smodel_brand?.name}
        </h3>
        <button onClick={() => {setEdit(true);
        setModel({
            brand:undefined,
            model_brand:undefined
        })
        
        }} className="mb-5 ml-2">
          <PencilIcon height={16} width={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 space-x-2">
        <div>
          <h3 className="text-md font-semibold mb-5">
            Quelle console souhaiter vous reparez.
          </h3>
          <SelectInput
            name="brand"
            control={control}
            options={
              loadingBrand
                ? []
                : dataBrand?.data.map((b) => ({ label: b?.name, value: b?.id }))
            }
          />
        </div>
        {brand && (
          <div>
            <h3 className="text-md font-semibold mb-5">Modele?</h3>
            <div className="flex">
              <div className="w-full mr-2">
                <SelectInput
                  className=""
                  name="model_brand"
                  control={control}
                  options={
                    brand
                      ? dataBrand?.data?.find((b) => b.id === brand.value)
                          ?.modeles
                      : []
                  }
                  getOptionLabel={(e: { name: any }) => e.name}
                  getOptionValue={(e: { id: any }) => e.id}
                />
              </div>
              {model_brand && (
                <Button size="medium" className="w-16 h-10">
                  Ok
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
