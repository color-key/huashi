import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    title: {
      padding: theme.spacing(1),
      display: 'flex',
      justifyContent: 'flex-end'
    }
  })
);

export type ButtonVariant = 'cancel' | 'know' | 'submit' | 'finish';

interface Props extends DialogProps{
  open: boolean;
  onClose?: () => void;
}

export default ({onClose, open, ...props}: Props) => {
  const classes = useStyles();
  return (
    <Dialog onClose={onClose} open={open} {...props} >
      <DialogTitle className={classes.title}>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <img src="/assets/images/example.png" className={classes.root}/>
    </Dialog>
  );
}