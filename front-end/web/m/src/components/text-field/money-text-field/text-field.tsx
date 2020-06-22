import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@/components/text-field';
import {getAccuracy} from './money-accuracy';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    adornment: {
      fontSize: '0.875rem',
    },
    root: {
      width: '100%',
      height: 76,
    },
    inputHeight: {
      height: 50,
    },
    left: {
      textAlign: 'left'
    },
    center: {
      textAlign: 'center'
    },
    right: {
      textAlign: 'right'
    }
  })
);

interface Props {
  currency?: string;
  value?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  align?: 'left' | 'center' | 'right';
  currencyClass?: string;
  onChange?: (e: string) => void;
  currencyClick?: () => void;
}

export default ({currency='BTC', align='left', onChange,currencyClick, currencyClass, ...props}: Props) => {
  const classes = useStyles();
  const [input, setInput] =React.useState(props.value);

  React.useEffect(() => {
    setInput(transferValue(props.value));
  }, [props.value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value;
    const tValue = transferValue(value)
    const valueNumer = tValue ? tValue.replace(/,/g,'') : '';
    if (onChange) onChange(valueNumer? valueNumer : '')
    setInput(tValue)
  };

  const transferValue = (value: string | undefined | null) => {
    if (value === "" || value === undefined || value === null) {
      return "0";
    }
    if (value === ".") {
      return "0.";
    }
    if (value.charAt(0) === "0") {
      if(value.length === 2 && value.charAt(1) === ".") { // 0.
        return value;
      }
      if(value.length === 2 && /^[0-9]*$/.test(value.charAt(1))) { // 02
        return value.substring(1, value.length);
      }
      if(value.length > 2 && value.charAt(1) === "." && !/^[0-9]*$/.test(value.charAt(2))) { // 0..
        return "0.";
      }
    }
    value = value.replace(/,/g, "");
    let point = "";
    if (value.charAt(value.length -1) === ".") {
      const list = value.match(/\./g);
      if (list && list.length === 1) {
        point = ".";
        value = value.replace(/\./, "");
      } else {
        return input;
      }
    }
    if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(value)) {
      let money: any = Number.parseFloat(value)
      if (money > 1) {
        money = money.toLocaleString()
      } else {
        money = value;
      }
      if(money.replace(/,/g, "").split(".")[0].length > 15) {
        return input;
      }
      if (point === ".") {
        return String(money)+".";
      } else {
        const pointMoney = money.split(".")[1]
        let pointValue = value.split(".")[1]
        if (pointValue >= pointMoney) {
          if (pointValue.length > getAccuracy(currency)) {
            pointValue = pointValue.substring(0, getAccuracy(currency));
          }
          return money.split(".")[0] + "." + pointValue;
        } else {
          return money === "0" ? value : String(money);
        }
      }
    }
    return input;
  }

  return (
    <FormControl className={classes.root}>
      <TextField
        className={classes.inputHeight}
        InputProps={{
          endAdornment: <InputAdornment disableTypography 
                                        position="end" 
                                        style={{width: 15*currency.length}} 
                                        className={clsx(classes.adornment, currencyClass)}
                                        onClick={currencyClick}
                        >{currency}</InputAdornment>
        }} 
        inputProps={{className: classes[align]}}
        {...props}
        onChange={handleInput}
        value={input}
      />
    </FormControl>
  );
}