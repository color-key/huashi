import React from 'react';
import TextField from '../text-field';

// interface Props{
//   defaultValue?: string
//   label?: string
//   placeholder?: string
//   fullWidth?: boolean
//   disabled?: boolean
//   onChange?: (value: string|null) => void
// }

const checkEmail = (value:string, notEmpty: boolean) => {
  if(!notEmpty && value.trim() === ''){
    return '';
  }
  if(value.trim() === ''){
    return '请输入E-mail';
  }else if(notEmpty && !(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))){
    return 'E-mail输入有误，请重新输入';
  }else if(value.length > 100){
    return '输入的信息过长，请检查后重新输入';
  }
  return '';
};

export default ({notEmpty=false, value, disabled=false, onChange, fullWidth, label, placeholder, errorText='', ...props}: any) => {
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    setError(errorText);
  }, [errorText])

  const handleChange = (e: any) => {
    const v = e.target.value;
    const checkMessage = checkEmail(v, notEmpty);
    setError(checkMessage);
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
      error={error.length>0}
      helperText={error}
      onBlur={props.onBlur}
      {...props}
    />
  );
}