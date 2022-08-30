import { Createrepair } from "@ts-types/repairs-type";
import { useMutation, useQueryClient } from "react-query";
import { RepairService } from "./transaction.service";
type RepairType = {
  id: string | number;
  input:any;
};

export const useUpdateRepairMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, input }: RepairType) => RepairService.update(id, input),
    {
      onSettled: () => {
        queryClient.invalidateQueries("repair");
      },
    }
  );
};
