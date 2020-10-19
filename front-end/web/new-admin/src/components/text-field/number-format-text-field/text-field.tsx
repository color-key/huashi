import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '../text-field';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
  max?: number,
  min?: number
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, max, min, ...other } = props;

  const [maxLength, setMaxLength] = React.useState<number|undefined>(undefined);
  const [minLength, setMinLength] = React.useState<number|undefined>(undefined);

  const handleValueChange = (values: any) => {
    let value = values.value;
    if(max && Number(values.value) > max){
      value = max;
      setMaxLength((max+'').length + Math.floor((max+'').length/3) - ((max+'').length%3 === 0 ? 1 : 0));
    }else if(min && Number(values.value) < min){
      value = min;
      setMinLength((min+'').length + Math.floor((min+'').length/3) - ((min+'').length%3 === 0 ? 1 : 0)-1);
    }else{
      setMaxLength(undefined);
      setMinLength(undefined);
    }
    console.log(max);
    console.log(value);
    console.log(maxLength);
    onChange({
      target: {
        value,
      },
    });
  }

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={handleValueChange}
      thousandSeparator
      isNumericString
      maxLength={maxLength}
      minLength={minLength}
    />
  );
};

export default ({InputProps, ...props}: any) => {

  return (
    <TextField
      InputProps={{
        inputComponent: NumberFormatCustom,
        ...InputProps,
      }}
      {...props}
    />
  );
}