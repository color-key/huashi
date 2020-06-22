import React, {useRef} from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@/components/text-field';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { grey, red } from '@material-ui/core/colors';

const useStyles = makeStyles((_theme) =>
  createStyles({
    root: {
      width: '100%',
      // height: 76,
      display: 'flex',
      flexDirection: 'row',
    },
    textField: {
      "& .MuiOutlinedInput-adornedEnd": {
        paddingRight: 0
      },
      "& .MuiButton-text": {
        padding: '15px 6px',
        width: "100%"
      },
      '& .MuiFilledInput-underline:before': {
        content: 'none'
      },
      '& .MuiFilledInput-underline:after': {
        content: 'none'
      },
      '& .MuiFilledInput-root': {
        backgroundColor: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: 4,
      }
    },
    adornment: {
      height: 40,
      padding: '6px 9px',
      borderRadius: '28px',
      fontSize: '0.875rem',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: '#263BE0',
      }
    },
    err: {
      fontSize: '0.75rem',
      color: red[400]
    },
    btn: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    main: {
      color: '#0060FF',
      '&:hover': {
        color: '#FFFFFF',
      },
      cursor: 'pointer'
    },
    grey: {
      color: grey[400],
      '&:hover': {
        color: grey[400],
      },
    },
    adron: {
      '&:hover': {
        backgroundColor: '#FFFFFF',
      }
    }
  })
);

interface Props {
  start: boolean,
  label?: string,
  actionText?: string,
  onChange?: (e?: string) => void,
  onClick?: (e?: any) => void,
  onBlur?: any,
  onFocus?: any,
  helpText?: string;
  adornStyle?: any;
  codeStyle?: any;
  startFuc?: Function;
}

export default ({ label = "请输入验证码", actionText = '获取验证码', onClick, onChange = () => ({}), start = false, startFuc, helpText = '', ...props }: Props) => {
  const classes = useStyles();
  const intervalRef = useRef(null);
  const [time, setTime] = React.useState('60s')
  const [control, setControl] = React.useState({
    click: false,
    next: false,
    err: ''
  });
  React.useEffect(() => {
    if (start && startFuc) {
      startFuc().then((res: Boolean) => {
        if (res) {
          setControl({ ...control, click: true, err: '' });
        }
      })
    }
  }, [start])
  React.useEffect(() => {
    if (!control.click) return;
    let showtime = 60;
    const timer = setInterval(() => {
      if (showtime <= 1) {
        setTime('1s');
        clearInterval(timer);
        setControl({ ...control, click: false, next: true, err: '' });
        setTime('60s');
      } else {
        showtime--;
        setTime(showtime + 's');
      }
    }, 1000)
    //@ts-ignore
    intervalRef.current = timer;
    //@ts-ignore
    return () => clearInterval(intervalRef.current);
  }, [control.click]);
  React.useEffect(() => {
    setControl({ ...control, err: helpText });
  }, [helpText])
  const handleClickCode = (_e: any) => {
    if (onClick && !control.click) {
      onClick(timePass)
    }
  }
  const timePass = () => {
    if (!control.click) {
      setControl({ ...control, click: true, err: '' });
    }
  }
  const handleCode = (e: any) => {
    setControl({ ...control, err: '' });
    onChange(e.target.value);
  }
  return (
    <FormControl className={classes.root}>
      <TextField
        error={control.err !== ''}
        label={label}
        fullWidth
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment
              disableTypography
              position="end"
              style={{ width: 100 }}
              className={clsx(classes.adornment, control.click ? classes.adron : null, props.adornStyle)}
              onClick={handleClickCode}
            >
              <Button className={clsx(classes.btn, classes.main, control.click ? classes.grey : null, props.codeStyle)}>{!control.click ? (control.next ? '重新发送' : actionText) : time}</Button>
            </InputAdornment>
          )
        }}
        onChange={handleCode}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        helperText={control.err}
        variant="filled"
      />
    </FormControl>
  );
}