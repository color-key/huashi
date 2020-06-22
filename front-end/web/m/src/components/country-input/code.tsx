import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PhoneTF from '@/components/text-field/phone-text-field';
// import Grid from '@material-ui/core/Grid';
import Select from '@/components/select';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import { Country } from './country';

const useStyles = makeStyles((theme) =>
  createStyles({
    country: {
      width: '100%',
      height: 30,
      display: 'flex',
      alignItems: 'center',
    },
    selectStyle: {
      width: theme.spacing(9),
      '& .MuiSelect-root': {
        display: 'flex',
        justifyContent: 'center',
      }
    },
    img: {
      marginRight: theme.spacing(1)
    },
    default: {
      height: 56,
      width: '25%',
      marginRight: theme.spacing(1)
    },
    content: {
      display: 'flex',
    }
  })
);
interface Props {
  onSelect: Function;
  defaultCountry: string;
  defaultPhone: string;
  label?: string;
  emptyErrorText?: string;
  longErrorText?: string;
  enterErrorText?: string;
  onPhone: Function;
  onBlur?: Function;
  className?: {
    root: {}
  };
  language?: string;
  error?: Boolean;
  showErrorText?: string;
  onFocus?: Function;
}
export default ({
  defaultCountry = 'CN', defaultPhone = '', label = '请输入手机号码',
  emptyErrorText, longErrorText, enterErrorText, language = 'zh',
  showErrorText, error,
  ...props
}: Props) => {
  const classes = useStyles();
  const [country, setCountry] = React.useState(defaultCountry);
  const [phone, setPhone] = React.useState('');
  React.useEffect(() => {
    setPhone(defaultPhone);
  }, [defaultPhone])
  let root = {}
  if (props.className) {
    root = props.className.root
  }
  const handleCountry = (e: any) => {
    setCountry(e);
    props.onSelect(e);
  }
  const handlePhoneChange = (e: any, result: boolean) => {
    props.onPhone(e, result);
  }
  const countryList = () => {
    return Country.map(item => {
      return (
        <MenuItem value={item.code} key={item.code} className={classes.country}>
          {language === 'zh' ? item.zh : item.label}
        </MenuItem>);
    })
  }
  const countryRender = (e: any) => {
    const select = Country.filter(v => v.code === e);
    if (select) {
      return <div className={classes.img}>+{select[0].phone}</div>
    }
    return <div />
  }
  return (
    <div className={clsx(classes.content, root)}>
      <Select
        label=""
        value={country}
        onChange={handleCountry}
        renderValue={(value: any) => countryRender(value)}
        selectStyle={classes.selectStyle}
        rootStyle={classes.default}
      >
        {countryList()}
      </Select>
      <PhoneTF
        label={label}
        onChange={(v: string | null, result: boolean) => handlePhoneChange(v, result)}
        fullWidth
        locale={country}
        defaultValue={phone}
        emptyErrorText={emptyErrorText}
        longErrorText={longErrorText}
        enterErrorText={enterErrorText}
        onBlur={props.onBlur}
        variant="filled"
        showErrorText={showErrorText}
        onFocus={props.onFocus}
      />
    </div>
  )
}