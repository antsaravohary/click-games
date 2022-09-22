import Button from "@components/ui/button";
import { formatToPrice } from "@utils/use-price";
import { useTranslation } from "next-i18next";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import { CloseIcon } from "@components/icons/close-icon";
import { useUpdateRepairMutation } from "@data/repair/use-repair-update.mutation";

const RepairItems = ({ repair, edit, setEdit }: any) => {
  const [states, setStates] = useState<any[]>(repair?.items);
  const { t } = useTranslation();
  const [total, setTotal] = useState<number>(repair.total_amount);
  const { mutate: updateRepair, isLoading } = useUpdateRepairMutation();
  useEffect(() => {
    let t = 0;
    states?.forEach((element: any) => {
      let i = parseInt(element?.pivot?.total_price);
      if (i) t += i;
    });
    setTotal(t);
  }, [states]);
  const repair_prices = repair.model_brand.repair_prices;
  const setItem = (item: any, idx: number) => {
    if (states.some((s) => s.id === item.id)) {
      return;
    }
    let newStates = [...states];
    newStates[idx] = {
      ...item,
      pivot: {
        ...item.pivot,
        price: item.price,
        repair_id: repair.id,
        repair_price_id: item.id,
        status: "pending",
        total_price: item.price,
      },
    };
    setStates(newStates);
  };
  const editPirce = (price: string, idx: number) => {
    let newStates = [...states];
    newStates[idx].pivot.price = price;
    newStates[idx].pivot.total_price = price;
    setStates(newStates);
  };

  const onSave = () => {
    if (repair.items !== states) {
      updateRepair(
        {
          variables: {
            id: repair.id,
            input: {
              action: "checking_repair_items",
              items: states.map((item: { pivot: any }) => ({
                id: item.pivot.id,
                price: item.pivot.price,
                total_price: item.pivot.total_price,
                repair_id: item.pivot.repair_id,
                repair_price_id: item.pivot.repair_price_id,
                status: "pending",
              })),
            },
          },
        },
        {
          onSuccess: () => {
            setEdit(false);
          },
        }
      );
    } else {
      setEdit(false);
    }
  };

  return (
    <div className="mb-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left w-full text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Designation
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Montant
            </th>
          </tr>
        </thead>
        <tbody>
          {states.map((s, idx) => (
            <tr
              key={s.id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {edit ? (
                  <ReactSelect
                    readOnly
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.id}
                    onChange={(e) => setItem(e, idx)}
                    value={repair_prices.find((r) => r.id === s.id)}
                    options={repair_prices}
                  />
                ) : (
                  <span>{s.name}</span>
                )}
              </td>
              <td className="px-6 flex justify-end py-4 whitespace-nowrap rounded-sm text-sm text-gray-500 text-right">
                {edit ? (
                  <>
                    <div className="mx-2 relative ">
                      <input
                        type="text"
                        value={s?.pivot?.price}
                        disabled={!s?.pivot ? true : false}
                        onChange={(e) => editPirce(e.currentTarget.value, idx)}
                        id="price"
                        className="border px-4 h-10  focus:boder-red-600  w-16 md:w-32"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="price-currency"
                        >
                          €
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setStates(
                          states.filter((ss) => ss.id !== s.id)
                        ); /*setStates(states.splice(idx, 1))*/
                      }}
                    >
                      <CloseIcon height={16} width={16} />
                    </button>
                  </>
                ) : (
                  <span>{formatToPrice(s.pivot.price)}</span>
                )}
              </td>
            </tr>
          ))}
          {edit && (
            <tr>
              <td>
                {" "}
                <button
                  onClick={() =>
                    setStates([
                      ...states,
                      { id: Math.random().toString(16).slice(2) },
                    ])
                  }
                  className="border w-6"
                >
                  +
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="border-t-4 border-double border-border-200 flex flex-col w-full sm:w-1/2 md:w-1/3 ms-auto px-4 py-4 space-y-2">
        {/**  <div className="flex items-center justify-between text-sm text-body">
              <span>{t("common:order-sub-total")}</span>
              <span>{data?.repair?.amount}</span>
            </div>
         
           * <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-tax")}</span>
            <span>{sales_tax}</span>
          </div>
           * 
          
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-delivery-fee")}</span>
            <span>{delivery_fee}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t("common:order-discount")}</span>
            <span>{discount}</span>
          </div> */}
        <div className="flex items-center justify-between text-base text-heading font-semibold">
          <span>{t("common:order-total")}</span>
          <span>{formatToPrice(total)}</span>
        </div>
      </div>
      {edit && (
        <div className="mt-5">
          <Button onClick={onSave} loading={isLoading} className="w-full">
            Valider
          </Button>
        </div>
      )}
    </div>
  );
};

export default RepairItems;
