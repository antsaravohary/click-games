import Repair from "@repositories/repair";
import { useQuery } from "react-query";
import { Repair as TRepair } from "@ts-types/repairs-type";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchOrder = async (id: string) => {
  const { data } = await Repair.find(`${API_ENDPOINTS.REPAIR}/${id}`);
  return { repair: data };
};

type RepairResponse = {
  repair: TRepair;
};

export const useRepairQuery = (id: string) => {
  return useQuery<RepairResponse, Error>([API_ENDPOINTS.REPAIR, id], () =>
    fetchOrder(id)
  );
};
