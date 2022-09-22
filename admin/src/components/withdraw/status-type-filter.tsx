import Select from "@components/ui/select/select";

import React from "react";
import { useTranslation } from "next-i18next";
import Label from "@components/ui/label";
import cn from "classnames";
import { useOrderStatusesQuery } from "@data/order-status/use-order-statuses.query";

type Props = {
  onStatusFilter: Function;
  className?: string;
};
const data=[
  {value:"approved",label:"Approuvée"},
  {value:"precessing",label:"En attente"},
  {value:"rejected",label:"Rejetée"},
  {value:"pending",label:"En attente"},

];
export default function StatusTypeFilter({
  onStatusFilter,
  className,
}: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full",
        className
      )}
    >
      <div className="w-full">
       
        <Select
          options={data}
          placeholder="Filtrer par statuts"
          onChange={onStatusFilter}
          clearable={true}
        />
      </div>
    </div>
  );
}
