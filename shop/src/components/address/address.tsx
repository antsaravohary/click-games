import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useCheckout } from "@contexts/checkout.context";
import { User } from "@ts-types/generated";
import { loggedIn } from "@utils/is-loggedin";
import { useEffect } from "react";

interface Props {
  id: string;
  me:User;
  heading: string;
  onSelect:any;
  addresses: any[] | undefined;
  count?: number;
  disabled?:boolean;
  type?: "billing" | "shipping";
}

const Address = ({ id, addresses, heading, count, type,me,onSelect,disabled}: Props) => {
  const { openModal } = useModalAction();
  const { updateBillingAddress, updateShippingAddress } = useCheckout();
  useEffect(() => {
    if (addresses) {
      if(onSelect){
        onSelect(addresses[0]);
      }
      
      updateBillingAddress(addresses[0]);
      updateShippingAddress(addresses[0]);
    }
  }, [addresses]);
  function handleAdd() {
    if (loggedIn()) {
      return openModal("ADD_OR_UPDATE_ADDRESS", { customerId: id, type,name:me.name });
    } else {
      openModal("LOGIN_VIEW");
    }
  }
  function handleEdit(address: any) {
    return openModal("ADD_OR_UPDATE_ADDRESS", { customerId: id, address });
  }
  function handleDelete(address: any) {
    return openModal("DELETE_ADDRESS", {
      customerId: id,
      addressId: address.id,
    });
  }
  function handleSelect(item: any) {
    /* if (type === "billing") {
      console.log("item on set address",item);
      updateBillingAddress(item);
    } else {
      updateShippingAddress(item);
    }*/
    if(onSelect){
      onSelect(item);
    }
   
    updateBillingAddress(item);
    updateShippingAddress(item);
  }
  return (
    <SectionWithCardGroup
      heading={heading}
      addActionText="text-address"
      items={addresses}
      count={count}
      disabled={disabled}
      defaultChecked={0}
      onSelect={handleSelect}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default Address;
