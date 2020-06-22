import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@/components/text-field';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    adornment: {
      fontSize: '0.875rem',
      position: 'relative',
    },
    root: {
      width: '100%',
      height: 76,
      display: 'flex',
      flexDirection: 'row',
    },
    inputHeight: {
      width: '100%',
      height: 50,
    },
    paddingRight: {
      paddingRight: 0,
    },
    left: {
      textAlign: 'left'
    },
    center: {
      textAlign: 'center'
    },
    right: {
      textAlign: 'right'
    },
    input: {
      color: theme.palette.common.black
    },
    expand: {
      display: 'flex',
      flexDirection: 'column',
      width: 24,
      height: 50,
      position: 'absolute',
      top: 0,
      right: 1
    },
    button: {
      minWidth: theme.spacing(3)
    },
    btnTop: {
      width: '100%',
      height: '48%',
      padding: 0,
      marginTop: 1,
      border: 'none',
      borderTopRightRadius: 4,
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      borderColor: theme.palette.grey[300],
      outline: 'none'
    },
    btnBottom: {
      width: '100%',
      height: '46%',
      padding: 0,
      border: 'none',
      borderBottomRightRadius: 4,
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
      borderColor: theme.palette.grey[300],
      outline: 'none'
    }
  })
);

interface Props {
  currency?: string;
  value?: string;
  align?: 'left' | 'center' | 'right';
  unit?: string;
  min?: string;
  max?: string;
  className?: string;
  disabled?: boolean
  fullWidth?: boolean
  onChange?: (e?: string) => void
}

export default ({fullWidth, className, currency='', align='left', unit= '1', value='0',onChange=()=>({}), disabled=false, ...props}: Props) => {
  const classes = useStyles();
  const [input, setInput] =React.useState(value);
  React.useEffect(() => {
    onChange(value);
  }, [value]);
  const valCount = value.indexOf(".") !== -1 ? value.split('.')[1] : "";
  const count = unit.indexOf(".") !== -1 ? unit.split('.')[1] : "";
  let base = 1;
  if (valCount.length > count.length) { // 12.3456 0.001
    base = Math.pow(10, valCount.length)
  } else {
    base = Math.pow(10, count.length)
  }
  const lessInput = () => {
    let res = Number.parseFloat(input)*base - Number.parseFloat(unit)*base;
    res = Math.round(res);
    if (props.min) {
      const min = Number.parseFloat(props.min)*base;
      if (res >= min) {
        setInput(String(res/base));
        onChange(String(res/base));
      }
    } else {
      setInput(String(res/base));
      onChange(String(res/base));
    }
  };
  const moreInput = () => {
    let res = Number.parseFloat(input)*base + Number.parseFloat(unit)*base;
    res = Math.round(res);
    if (props.max) {
      const max = Number.parseFloat(props.max)*base;
      if (res <= max) {
        setInput(String(res/base));
        onChange(String(res/base));
      }
    } else {
      setInput(String(res/base));
      onChange(String(res/base));
    }
  };
  return (
    <FormControl className={clsx(classes.root, className)} fullWidth={fullWidth}>
      <TextField
        className={classes.inputHeight}
        InputProps={{
          endAdornment: <InputAdornment position="end">{''}</InputAdornment>
        }} 
        inputProps={{className: clsx(classes[align], {[classes.input]: !disabled})}}
        {...props}
        type=''
        disabled
        value={input}
      />
      {
        disabled ||
        <div className={classes.expand}>
          <Button className={clsx(classes.button, classes.btnTop)} variant={"outlined"} onClick={moreInput} disabled={disabled}>
            <ExpandLessIcon />
          </Button>
          <Button className={clsx(classes.button, classes.btnBottom)} variant={"outlined"} onClick={lessInput} disabled={disabled}>
            <ExpandMoreIcon />
          </Button>
        </div>
      }
    </FormControl>
  );
}