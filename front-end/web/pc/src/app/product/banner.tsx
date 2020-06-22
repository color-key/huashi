import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {PATH_PREFIX} from '@/env';

const height = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat center`,
    backgroundSize: 'cover'
  },
  content: {
    height,
    color: theme.palette.common.white,
    width: '100%',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>

      </div>
    </div>
  );
};
