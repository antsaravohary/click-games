import { Order } from "@ts-types/custom.types";
import { repair } from "@ts-types/repairs-type";
import { useQuery } from "react-query";
import { RepairService } from "./transaction.service";

export const fetchRepair = async (orderId: string) => {
  const { data } = await RepairService.findOne(`${orderId}`);
  return {
    repair: data,
  };
};
export const useRepairQuery = ({ ref }: { ref: string }) => {
  return useQuery<{ repair: repair }, Error>(["repair", ref], () =>
    fetchRepair(ref)
  );
};
