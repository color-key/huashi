import React from 'react';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import clsx from 'clsx';
import {Theme} from "@/components/theme";
import {OutlinedInputProps} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    inputLabel: {
      fontSize: '0.875rem',
      transform: 'translate(12px, 22px) scale(1)'
    },
    input: {
      padding: '25px 12px 10px',
      "&:-internal-autofill-previewed, &:-internal-autofill-selected": {
        // "-webkit-text-fill-color": "#807c7c",
        "transition": "background-color 5000s ease-out 0.5s"
      }
    }
  })
);

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
      '&$focused': {
        backgroundColor: theme.palette.common.white,
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }),
);

export default ({InputLabelProps={}, multiline, inputProps={}, InputProps={}, ...props}: TextFieldProps) => {
  const classes = useStyles();
  const maxLength = multiline ? 200 : 50;
  const {variant="filled", ...otherProps} = props;
  const {className: InputLabelPropsClassName, ...otherInputLabelProps} = InputLabelProps;
  const {className: inputPropsClassName, ...otherinputProps} = inputProps;
  const _InputLabelProps = {className: clsx(classes.inputLabel, InputLabelPropsClassName), ...otherInputLabelProps};
  const _inputProps = {className: inputPropsClassName, maxLength, ...otherinputProps};

  if(variant === "filled"){
    const outlinedClasses = useStylesReddit();
    const _InputFilledProps = { classes: outlinedClasses, disableUnderline: true, ...InputProps };
    const _inputFilledProps = {className: clsx(classes.input, inputPropsClassName), maxLength, ...otherinputProps};
    return (
      <TextField
        InputLabelProps={_InputLabelProps}
        inputProps={_inputFilledProps}
        multiline={multiline}
        InputProps={_InputFilledProps as Partial<OutlinedInputProps>}
        variant="filled"
        {...props}
      />
    );
  }
  if(variant === 'outlined'){
    return (
      <TextField
        variant={"outlined"}
        InputLabelProps={InputLabelProps}
        inputProps={_inputProps}
        InputProps={InputProps}
        multiline={multiline}
        {...otherProps}
      />
    );
  }
  return (
    <TextField
      InputLabelProps={_InputLabelProps}
      inputProps={_inputProps}
      InputProps={InputProps}
      multiline={multiline}
      {...props}
    />
  );
}