import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      marginLeft: theme.spacing(4)
    },
    button: {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      marginRight: theme.spacing(4)
    }
  }),
);

export default ({onError, children}: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant={"body2"}>{children}</Typography>
      <Button variant="outlined" className={classes.button} onClick={onError} size='small'>
        知道了
      </Button>
    </div>
  );
}