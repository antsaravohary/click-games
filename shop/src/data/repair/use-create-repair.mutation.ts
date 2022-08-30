import { Createrepair } from "@ts-types/repairs-type";
import { useMutation } from "react-query";
import { RepairService } from "./repair.service";



export const useCreateRepairMutation = () => {
  return useMutation((input: Createrepair) =>
    RepairService.create(input)
  );
};
