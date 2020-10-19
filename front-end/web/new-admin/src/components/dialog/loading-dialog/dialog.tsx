import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import clsx from 'clsx';

const width = 480;
const height = 64;
const speed = 3;
const long = 300;
const thickness = 2;
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width,
      height,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(2, 4),
      flexDirection: 'row',
      overflow: 'hidden'
    },
    error: {
      backgroundColor: theme.palette.secondary.main,
    },
    progress: {
      position: 'absolute'
    },
    progress1: {
      left: `-${long}px`,
      bottom: 0,
      height: thickness,
      width: long,
      backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 1%, ${theme.palette.common.white})`,
    },
    progress1Transition: {
      left: width,
      transition: theme.transitions.create('left', {
        easing: theme.transitions.easing.sharp,
        duration: (width+long)*speed,
      }),
    },
    progress2: {
      right: 0,
      bottom: `-${long}px`,
      height: long,
      width: thickness,
      backgroundImage: `linear-gradient(to top, ${theme.palette.primary.main} , ${theme.palette.common.white})`,
    },
    progress2Transition: {
      bottom: height,
      transition: theme.transitions.create('bottom', {
        easing: theme.transitions.easing.sharp,
        duration: (height+long)*speed,
      }),
    },
    progress3: {
      right: `-${long}px`,
      top: 0,
      height: thickness,
      width: long,
      backgroundImage: `linear-gradient(to left, ${theme.palette.primary.main} , ${theme.palette.common.white})`,
    },
    progress3Transition: {
      right: width,
      transition: theme.transitions.create('right', {
        easing: theme.transitions.easing.sharp,
        duration: (width+long)*speed,
      }),
    },
    progress4: {
      left: 0,
      top: `-${long}px`,
      height: long,
      width: thickness,
      backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main} , ${theme.palette.common.white})`,
    },
    progress4Transition: {
      top: height,
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.sharp,
        duration: (height+long)*speed,
      }),
    },
  })
);

export type ButtonVariant = 'cancel' | 'know' | 'submit' | 'finish';

interface Props extends DialogProps{
  open: boolean;
  error?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  PaperProps?: {className: string};
}

const initState = {progress1: false, progress2: false, progress3: false, progress4: false};
export default ({onClose, open, children, PaperProps, error, ...props}: Props) => {
  const classes = useStyles();
  const [state, setState] = React.useState(initState);

  React.useEffect(() => {
    const currentState = {progress1: true, progress2: false, progress3: false, progress4: false};
    let timeout0: any;
    let timeout1: any;
    let timeout2: any;
    let timeout3: any;
    let timeout4: any;
    let timeout5: any;
    let timeout6: any;
    let timeout7: any;
    let timeout8: any;
    const timeout = () => {
      timeout1 = setTimeout(() => {
        currentState.progress2 = true;
        setState({...currentState});
      }, width*speed);
      timeout2 = setTimeout(() => {
        currentState.progress1 = false;
        setState({...currentState});
      }, (width+long)*speed);
      timeout3 = setTimeout(() => {
        currentState.progress3 = true;
        setState({...currentState});
      }, (width+height)*speed);
      timeout4 = setTimeout(() => {
        currentState.progress2 = false;
        setState({...currentState});
      }, (width+height+long)*speed);
      timeout5 = setTimeout(() => {
        currentState.progress4 = true;
        setState({...currentState});
      }, (width*2+height)*speed);
      timeout6 = setTimeout(() => {
        currentState.progress3 = false;
        setState({...currentState});
      }, (width*2+height+long)*speed);
      timeout7 = setTimeout(() => {
        currentState.progress1 = true;
        setState({...currentState});
        timeout();
      }, (2*(width+height))*speed);
      timeout8 = setTimeout(() => {
        currentState.progress4 = false;
        setState({...currentState});
      }, (2*(width+height)+long)*speed);
    };
    timeout0 = setTimeout(() => {
      setState({...currentState});
    }, 0);
    timeout();
    return () => {
      timeout0 && clearTimeout(timeout0);
      timeout1 && clearTimeout(timeout1);
      timeout2 && clearTimeout(timeout2);
      timeout3 && clearTimeout(timeout3);
      timeout4 && clearTimeout(timeout4);
      timeout5 && clearTimeout(timeout5);
      timeout6 && clearTimeout(timeout6);
      timeout7 && clearTimeout(timeout7);
      timeout8 && clearTimeout(timeout8);
    }
  }, [error]);

  const {className, ...otherPaperProps} = PaperProps || {className:''};
  return (
    <Dialog onClose={onClose} open={open} disableBackdropClick PaperProps={{className: clsx(classes.paper, {[classes.error]: error}, className), ...otherPaperProps}} {...props}>
      {children}
      <div className={clsx(classes.progress, classes.progress1, {[classes.progress1Transition]: state.progress1})}/>
      <div className={clsx(classes.progress, classes.progress2, {[classes.progress2Transition]: state.progress2})}/>
      <div className={clsx(classes.progress, classes.progress3, {[classes.progress3Transition]: state.progress3})}/>
      <div className={clsx(classes.progress, classes.progress4, {[classes.progress4Transition]: state.progress4})}/>
    </Dialog>
  );
}