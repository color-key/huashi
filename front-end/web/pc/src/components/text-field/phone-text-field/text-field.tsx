import React from 'react';
import TextField from '@/components/text-field';
import {checkTargetLocale} from './phone';

const checkPhone = (value:string, notEmpty: boolean, locale?: string, emptyErrorText?: string, longErrorText?: string, enterErrorText?: string) => {
  if(!notEmpty && value.trim() === ''){
    return '';
  }
  if(value.trim() === ''){
    return emptyErrorText || '请选择联系方式';
  }
  if(value.length > 50){
    return longErrorText || '输入的信息过长，请检查后重新输入';
  }
  if(!checkTargetLocale(value, locale)){
    return enterErrorText || '手机号码输入有误，请重新输入';
  }
  return '';
};

export default ({
  notEmpty=false, defaultValue='', locale, onChange, disabled=false, fullWidth, label, placeholder,
  emptyErrorText, longErrorText, enterErrorText, showErrorText,
  ...props
}: any) => {
  const [value, setValue] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue])
  React.useEffect(() => {
    setErrorText(showErrorText || '');
  }, [showErrorText])
  const handleChange = (e: any) => {
    const v = e.target.value;
    setValue(v);
    const checkMessage = checkPhone(v, notEmpty, locale, emptyErrorText, longErrorText, enterErrorText);
    setErrorText(checkMessage);
    onChange && onChange(v, checkMessage.length === 0);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      error={errorText.length>0}
      helperText={errorText}
      {...props}
    />
  );
}