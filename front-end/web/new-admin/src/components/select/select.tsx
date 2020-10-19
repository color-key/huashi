import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 580
    },
    formControl: {
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      // transform: 'translate(14px, 16px) scale(1)',
    },
    select: {
      '& .MuiSelect-root':{
        padding: '18.5px 14px'
      }
    }
  })
);

interface Props{
  label?: string,
  value?: unknown,
  error?: string,
  selectStyle?: any,
  rootStyle?: any,
  disabled?: boolean,
  onChange?: (value: string) => void,
  children?: React.ReactNode,
  renderValue?: (value: unknown) => React.ReactNode;
}


export default ({label, value='', renderValue, error, disabled=false, onChange, children, selectStyle, rootStyle}: Props) => {
  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth || Number((label||'').length) * 16);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange && onChange(event.target.value as string);
  };

  return (
    <div className={clsx(classes.root, rootStyle)}>
      <FormControl variant="outlined" className={classes.formControl} error={!!error && error.length > 0}>
        <InputLabel ref={inputLabel} className={classes.label}>
          {label}
        </InputLabel>
        <Select
          disabled={disabled}
          value={value}
          onChange={handleChange}
          labelWidth={labelWidth}
          renderValue={renderValue}
          className={clsx(classes.select, selectStyle)}
        >
          {children}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </div>
  );
}