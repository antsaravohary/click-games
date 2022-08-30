import Input from "@components/ui/input";
import Radio from "@components/ui/radio/radio";
import SelectInput from "@components/ui/select-input";
import { useBrandQuery } from "@data/brand/use-brand.query";
import { ModeleType, Product, Type } from "@ts-types/custom.types";
import { champs_required_data } from "@utils/data";
import { useWatch } from "react-hook-form";

type Iprops = {
  champ: string;
  product: Product;
  register?: any;
  control?: any;
};
const RenderChampsRequired = ({
  champ,
  product,
  register,
  control,
}: Iprops) => {
  const category = product?.categories ? product.categories[1] : undefined;
  switch (champ) {
    case "type":
      return (
        <div className="col-span-6 m-4">
          <h4 className="mb-2 text-md font-semibold">
            {category?.type_label ?? "Type"}
          </h4>
          <div className="flex space-x-2">
            {category?.types?.map((t: any) => (
              <Radio
                id="type"
                {...register("type")}
                value={t.id}
                label={t.name}
              />
            ))}
          </div>
        </div>
      );
      break;
    case "status":
      return (
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
            Status
          </label>
          <SelectInput control={control} name={champ} options={[]} label />
        </div>
      );
      break;
    case "brand":
      const { data, isLoading } = useBrandQuery();
      const brand = useWatch({
        control,
        name: "brand",
      });
    const   brands=data?.data;
      console.log("brand",brand);
      return (
        <>
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
              Marque
            </label>
            <SelectInput
              isLoading={isLoading}
              control={control}
              name={champ}
              options={brands?.map((d: { name: any; id: any;modeles:ModeleType[] }) => ({
                label: d.name,
                value: d.id,
                modeles:d.modeles
              }))}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
              Modele
            </label>
            <SelectInput
              isDisbled={brand === undefined}
              control={control}
              name={"modele"}
              options={
               brand?.modeles?.map((d:{name:string;id:number})=>({
                 label:d.name,
                 value:d.id
               }))
              }
            />
          </div>
        </>
      );
      break;
    default:
      const champ_data=champs_required_data.find((c) => c.value === champ);
      if (champ_data?.options) {
        const validate=(s:any)=>{
          if(s?.value){
            return true;
          }else{
            return false;
          }
        }
        return (
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
              {champ_data.label}
            </label>
            <SelectInput control={control} rules={{validate}} name={champ} options={champ_data.options} />
          </div>
        );
      } else {
        return (
          <div className="col-span-6 sm:col-span-3">
            <Input
              className="w-100"
              label={champ_data?.label}
              {...register(champ,{required:champ_data?.label+" requis!"})}
              dimension="small"
              variant="outline"
            />
          </div>
        );
      }
      break;
  }
};

export default RenderChampsRequired;
