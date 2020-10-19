import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import InputAdornment from '@material-ui/core/InputAdornment';
import EyeClose from '@/components/icons/eyeclose';
import EyeOpen from '@/components/icons/eyeopen';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';
import TextField from '@/components/text-field';
import { pwRules } from './code';

const useStyles = makeStyles((_theme: Theme) => ({
  pwTop: {
    // margin: theme.spacing(0.8, 0, 0, 0),
  },
  img: {
    width: 24,
    height: 24,
    color: grey[600]
  },
  err: {
    color: '#f44336'
  },
}))

export default ({
  label='请输入密码', defaultValue='', error=false, errorText='', onChange, onKeyUp
}: any) => {
  const classes = useStyles({});
  const [values, setValues] = React.useState({
    showPassword: false,
    password: '',
    error: false,
    errorText: ''
  })
  React.useEffect(() => {
    setValues({...values, password: defaultValue, errorText})
  },[defaultValue, error, errorText])

  const handlePWChange = (e: any) => {
    let eText = '';
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-z]|[A-Z]|[0-9]){8,20}$/;
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#~!@$%'\+\*\-:;^_`]+$)[,\.#~!@$%'\+\*\-:;^_`0-9A-Za-z]{8,20}$/;
    if (!pwRules(e.target.value)) {
      eText = '密码8-20位，必须包含数字、字母和字符中的两种'
    }
    setValues({ ...values, password: e.target.value, errorText: eText});
    onChange && onChange(e.target.value);
  }
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
    <TextField
      fullWidth
      label={label}
      InputProps={{
        id: "password",
        type: values.showPassword ? 'text' : 'password',
        value: values.password,
        onChange: handlePWChange,
        endAdornment: 
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <EyeOpen className={classes.img}/> : <EyeClose className={classes.img}/>}
            </IconButton>
          </InputAdornment>
      }}
      helperText={values.errorText}
      error={values.errorText.length>0}
      onKeyUp={onKeyUp}
    />
  )
}