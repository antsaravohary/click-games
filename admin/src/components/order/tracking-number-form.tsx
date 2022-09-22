
import { PlusIcon } from "@components/icons/plus-icon";
import { useUpdateOrderMutation } from "@data/order/use-order-update.mutation";
import { Order } from "@ts-types/generated";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    tracking_number: string;
};

export default function TrackingNumberForm({order}:any) {
    const [show, setShow] = useState<boolean>(false);
    const { handleSubmit, register,formState: { errors }, } = useForm<FormValues>({});
    const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation();
    const addTrackingNumber=({tracking_number}:FormValues)=>{
        updateOrder({
            variables: {
              id: order?.id as string,
              input: {
                tracking_number: tracking_number as string,
              },
            },
          });

    }
    
    return (
        <>
            {!show ? <button className="flex items-center justify-center  p-2 rounded-md bg-accent text-light  mb-2"
                onClick={() => setShow(true)}
            >

                <PlusIcon className="w-3 h-3" /> Ajout numero de suivie
            </button> : <form onSubmit={handleSubmit(addTrackingNumber)}>
                <div className="flex">

                    <input
                        type="text"
                        {...register("tracking_number")}
                        placeholder="numero de suivie de colis"
                        className="py-2 px-5 font-semibold flex-shrink-0 rounded shadow-400 transition-colors border-2  "
                    />
                    <button
                        type="submit"
                        className=" ml-1 border-2  py-2 px-5 font-semibold flex-shrink-0 text-light bg-accent rounded shadow-400 transition-colors  hover:bg-accent-hover focus:bg-accent-hover"
                    >
                        Appliquer
                    </button>
                </div>


            </form>}

        </>)
}