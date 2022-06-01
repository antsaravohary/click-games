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

export default function StatusTypeFilter({
  onStatusFilter,
  className,
}: Props) {
  const { t } = useTranslation();

  const {
    data:statusData,
    isLoading: loading,
    error,
  } = useOrderStatusesQuery({
    limit: 100,
  });
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full",
        className
      )}
    >
      <div className="w-full">
       
        <Select
          options={statusData?.order_statuses?.data}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          placeholder="Filtrer par statuts"
          isLoading={loading}
          onChange={onStatusFilter}
        />
      </div>
    </div>
  );
}
