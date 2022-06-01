import Label from "@components/ui/label";
import SelectInput from "@components/ui/select-input";
import { useRepair } from "@contexts/repair.context";
import { formatToPrice } from "@utils/use-price";
import { useForm } from "react-hook-form";
import { Button } from "..";

type FormValue = {
  repair_price: {};
};
export default function RepairPriceSelect() {
  const { control, handleSubmit, watch,setValue } = useForm<FormValue>();
  const { model_brand,addRepairItem,repair_items } = useRepair();
  const repair_price = watch("repair_price");
  return (
    <form onSubmit={handleSubmit((values) => {
        addRepairItem({
            repair_price:values?.repair_price,
            price:values?.repair_price?.price,
            total_price:values?.repair_price?.price
        });
        setValue("repair_price",{});

    })}>
      <Label>Veuillez selectionnez un élement à reparer</Label>
      <div className="flex">
        <div className="w-full">
          <SelectInput
            name="repair_price"
            control={control}
            getOptionLabel={(e: any) => e.name}
            getOptionValue={(e: any) => e.id}
            options={model_brand?.repair_prices?.filter((r:any)=>!repair_items.some((item:any)=>item.repair_price.id===r.id))}
          />
        </div>
        {repair_price?.id && (
          <Button size="medium" className="h-10 ml-2">
            Ajouter
          </Button>
        )}
      </div>
    </form>
  );
}
