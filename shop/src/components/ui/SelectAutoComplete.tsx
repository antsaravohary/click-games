import React from 'react';
import AsyncSelect from 'react-select/async';

type SelectProps = {
  className?: string;
  labelText?: string;
  as?: string;
  name?: string;
  value?: any;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  loadOptions: any;
  onChange: any;
  noOptionsMessage:any
  placeholder?:string;
  props?: any;
};

const SelectAutoComplete: React.FC<SelectProps> = ({
  className,
  labelText,
  labelPosition,
  loadOptions,
  noOptionsMessage,
  placeholder,
  onChange,

  ...props
}) => {
  // Add all classes to an array
  const addAllClasses = ['pickbazar__select'];

  // Add label position class
  if (labelPosition) {
    addAllClasses.push(`label_${labelPosition}`);
  }

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  const LabelField = labelText && (
    <span className="pickbazar__field-label">{labelText}</span>
  );

  const position = labelPosition || 'top';

  return (
    <div style={{ height: '50px' }} className={addAllClasses.join(' ')}>
      {position === 'left' || position === 'right' || position === 'top'
        ? LabelField
        : ''}

      <AsyncSelect
        className="select-field__wrapper"
        classNamePrefix="select"
        loadOptions={loadOptions}
        onChange={onChange}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
        {...props}
      />
      {position === 'bottom' && LabelField}
    </div>
  );
};

SelectAutoComplete.defaultProps = {
  as: 'div',
  labelPosition: 'top',
};

export default SelectAutoComplete;
