
import { Controller } from "react-hook-form";
import CreatableSelect  from 'react-select/creatable';
import { selectStyles } from "./select/select.styles";

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: any;
  handleChange:any;
  handleCreate:any;
  getOptionLabel:any;
  getOptionValue:any;
  [key: string]: unknown;
}

const CreatableInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  handleChange,
  handleCreate,
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
        <CreatableSelect<any>
          styles={selectStyles}
          {...field}
          cacheOptions
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti
          onCreateOption={handleCreate}
          handleChange={handleChange}
          defaultOptions
          options={options}
        />
      )}
    />
  );
};

export default CreatableInput;
