import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

export default ({value, ...props}: NumberFormatProps) => {
  
  return (
    <NumberFormat value={value} displayType={'text'} thousandSeparator fixedDecimalScale decimalScale={2} prefix={'¥'} {...props}/>
  );
}