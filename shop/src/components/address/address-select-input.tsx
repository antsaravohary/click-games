import SelectInput from "@components/ui/select-input";
import { useCustomerQuery } from "@data/subscription/use-customer.query";
import { formatAddress } from "@utils/format-address";

const AddressSelectInput = ({ control,name }: any) => {
  const { data, isLoading } = useCustomerQuery();      
  return (
    <div>
      <SelectInput
        name={name}
        control={control}
        isLoading={isLoading}
        getOptionLabel={(e:any)=>formatAddress(e.address)}
        getOptionValue={(e:any)=>e.id}
        options={isLoading ? [] : data?.me?.address}
      />
    </div>
  );
};

export default AddressSelectInput;
