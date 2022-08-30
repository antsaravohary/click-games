import { Order } from "@ts-types/custom.types";
import { Address } from "@ts-types/generated";
import { repair } from "@ts-types/repairs-type";
import { useQuery } from "react-query";
import { AddressService } from "./address.service";

export const fetchAddeess = async (orderId: string) => {
  const { data } = await AddressService.findOne(`${orderId}`);
  return {
    address: data,
  };
};
export const useAddressQuery = ({
  id,
}: {
  id: string;
}) => {
  return useQuery<{ address: Address  }, Error>(["address", id], () =>
  fetchAddeess(id)
  );
};
