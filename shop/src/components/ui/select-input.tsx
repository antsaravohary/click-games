import Select from "@components/ui/select/select";
import { Controller } from "react-hook-form";

interface SelectInputProps {
  control?: any;
  rules?: any;
  name: string;
  isDisbled?:boolean;
  getOptionLabel?:any;
  onInputChange?:any;
  getOptionValue?:any;
  options: object[];
  [key: string]: unknown;
}

const SelectInput = ({
  control,
  options,
  name,
  isDisbled,
  rules,
  onInputChange,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          isDisabled={isDisbled}
          onInputChange={onInputChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
        />
      )}
    />
  );
};

export default SelectInput;
