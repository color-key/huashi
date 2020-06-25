import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Finish from './finish';
import Error from './error';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: 480,
      // marginTop: theme.spacing(-12)
    },
    title: {
      // padding: theme.spacing(4)
    },
    closeButton: {
      position: 'absolute',
      padding: theme.spacing(0.5),
      top: 0,
      right: 0,
    },
    tabs: {
      marginBottom: theme.spacing(3.5),
    },
    content: {
      padding: theme.spacing(0, 4),
      marginBottom: theme.spacing(4),
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    footer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: '60px',
      height: '60px',
      borderTop: '1px solid rgba(238,238,238,1)',
    },
    buttons: {
      height: 36,
      alignSelf: 'center',
      padding: theme.spacing(0, 4),
    },
    button: {
      marginLeft: theme.spacing(1),
      boxShadow: 'none',
      borderRadius: 4
    },
    paperContent: {
      '& .MuiDialog-scrollPaper': {
        marginTop: theme.spacing(15),
        alignItems: 'flex-start'
      }
    }
  })
);

export type ButtonVariant = 'cancel' | 'know' | 'confirm' | 'submit' | 'finish';

interface Props extends DialogProps{
  open: boolean;
  onClose?: () => void;
  onDeviceConfirmCancel?: () => void;
  tabs?: React.ReactElement | boolean;
  children: React.ReactNode;
  footerLeft?: React.ReactNode;
  footerComponent?: React.ReactNode;
  onSubmit?: () => void;
  onConfirm?: () => void;
  onError?: () => void;
  onFinish?: () => void;
  onKnow?: () => void;
  submitDisabled?: boolean;
  deviceConfirm?: boolean;
  loading?: boolean;
  footer?: boolean;
  errorText?: string;
  finishText?: string;
  submitText?: string;
  PaperProps?: {className: string};
  buttonVariant?: ButtonVariant[];
  contentStyle?: any;
  showClose?: boolean;
}

export default ({
  onClose, open, title, tabs, loading=false, children, onSubmit, onConfirm, submitDisabled=false,
  deviceConfirm=false, footer=false, footerComponent, finishText, errorText, onError, onFinish, buttonVariant=[],
  onDeviceConfirmCancel, PaperProps, footerLeft, onKnow,
  submitText,
  contentStyle,
  showClose=true,
  ...props}: Props) => {
  const classes = useStyles();

  const handleSubmit = () => {
    onSubmit && onSubmit();
  };

  const Buttons = {
    'cancel': (
      <Button key={1} variant="outlined" className={classes.button} onClick={onClose}>
        取消
      </Button>
    ),
    'know': (
      <Button key={2} variant="contained" color="primary" className={classes.button} onClick={onKnow || onClose}>
        我知道了
      </Button>
    ),
    'confirm': (
      <Button key={3} variant="contained" color="primary" className={classes.button} onClick={onConfirm}>
        确认
      </Button>
    ),
    'submit': (
      <Button key={4} variant="contained" color="primary" className={classes.button} onClick={handleSubmit} disabled={loading || submitDisabled}>
        {
          loading ?
          <><CircularProgress size={18}/>&nbsp;{submitText || '提交中'}</>
          :
          submitText || '提交'
        }
      </Button>
    ),
    'finish': (
      <Button key={5} variant="contained" color="primary" className={classes.button} onClick={onClose}>
        完成
      </Button>
    ),
  };
  const {className, ...otherPaperProps} = PaperProps || {className:''};
  return (
    <Dialog onClose={onClose} open={open} scroll='paper' disableBackdropClick PaperProps={{className: clsx(classes.paper, className), ...otherPaperProps}} {...props} className={classes.paperContent}>
      <DialogTitle className={classes.title}>
        {title}
        {showClose ? 
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton> : null
      }
        
      </DialogTitle>
      {
        tabs &&
        <div className={classes.tabs}>
          {tabs}
        </div>
      }
      <div className={clsx(classes.content, contentStyle)}>
        {children}
      </div>
      {
        footer ?
        <div className={classes.footer}>
          {
            errorText ? <Error onError={onError}>{errorText}</Error>
            :
            finishText ? <Finish onFinish={onClose}>{finishText}</Finish>
            :
            [
              <div key={1}>{footerLeft}</div>,
              <div className={classes.buttons} key={2}>
                {
                  buttonVariant.map((v: ButtonVariant) => Buttons[v])
                }
              </div>
            ]
          }
        </div> : null
      }
    </Dialog>
  );
}