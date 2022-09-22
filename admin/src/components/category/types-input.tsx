import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useFieldArray } from "react-hook-form";

const TypesInput = ({ control,register }: any) => {
  const { append, remove, fields } = useFieldArray({
    name: "types",
    keyName: "key",
    control,
  });

  return (
    <div className="ml-4 px-2 ">
      {fields.map((field, index) => {
        return (
          <div className="mb-2" key={field.key}>
            <Input className=" " dimension="small" {...register(`types.${index}.name`)} />
          </div>
        );
      })}
      <Button type="button"   onClick={()=>{append({name:"",id:null,})}} className="my-2 w-full" size="small">Ajouter un type</Button>
    </div>
  );
};

export default TypesInput;
