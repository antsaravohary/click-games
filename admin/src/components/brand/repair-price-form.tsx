import { CloseIcon } from "@components/icons/close-icon";
import { PlusIcon } from "@components/icons/plus-icon";
import { useFieldArray } from "react-hook-form";

export default function RepairPriceForm({
  name,
  control,
  register,
}: {
  name: string;
  control: any;
  register: any;
}) {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
    keyName: "key",
  });
  return (
    <>
      <h4>Tarif de reparation:</h4>
      {fields.map((field, index) => {
        return (
          <div key={field.key} className=" ml-5 mb-2 flex">
            <input
              type="hidden"
              {...register(`${name}[${index}].id`)}
              value={field.id}
            />
            <input
              className="w-full px-2 border focus:boder-0"
              {...register(`${name}[${index}].name`)}
              placeholder="désignation"
            />
            <div className="mx-2 relative rounded-md shadow-sm">
              <input
                type="text"
                {...register(`${name}[${index}].price`)}
                id="price"
                className="border px-4 focus:boder-red-600  w-16 md:w-32"
                placeholder="0.00"
                aria-describedby="price-currency"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  €
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                remove(index);
              }}
              className="text-red-500"
            >
              <CloseIcon height={16} width={16} />
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          append({ name: "", id: "" });
        }}
        className="ml-5 text-accent border border-accent"
      >
        <PlusIcon height={16} width={16} />
      </button>
    </>
  );
}
