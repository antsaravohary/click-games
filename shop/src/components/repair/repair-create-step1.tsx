import Label from "@components/ui/label";
import { useModalAction } from "@components/ui/modal/modal.context";
import SelectInput from "@components/ui/select-input";
import SelectAutoComplete from "@components/ui/SelectAutoComplete";
import { SaleGameProvider, useGameSale } from "@contexts/game-sale.context";
import { useRepair } from "@contexts/repair.context";
import { useBrandQuery } from "@data/brand/use-brand.query";
import { useGamesQuery } from "@data/game/use-games.query";
import { usePlatformsQuery } from "@data/platform/use-platforms.query";
import { Platform } from "@ts-types/platforms-type";
import { formatToPrice } from "@utils/use-price";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "..";
import RepairPriceSelect from "./repair-price-select";
import RepairSelectModel from "./repair-select-model";

type FormValue = {
  game: any;
  platform: any;
};

const RepairCreateStep1 = () => {

  const { model_brand, repair_items, deleteRepairItem, total_amount, setStep } =
    useRepair();

  return (
    <div className="bg-white max-w-3xl   p-8 md:rounded-md">
      <RepairSelectModel />
      {model_brand &&
        model_brand.repair_prices.length !== repair_items.length && (
          <RepairPriceSelect />
        )}
      {repair_items.length > 0 && (
        <>
          <table className="min-w-full divide-y divide-gray-200 mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Designation
                </th>
                <th
                  scope="col"
                  className=" w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Montant
                </th>
                <th scope="col" className="relative px-6 py-3 w-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {repair_items.map((repair_item: any) => (
                <tr key={repair_item.repair_price.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {repair_item.repair_price.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatToPrice(repair_item.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      onClick={() => {
                        deleteRepairItem(repair_item.repair_price.id);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 "
                    >
                      x
                    </a>
                  </td>
                </tr>
              ))}
              <tr className="border-t">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  TOTAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatToPrice(total_amount)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            <Button onClick={() => setStep(2)}>Suivant</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RepairCreateStep1;
