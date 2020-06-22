import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from './tabs';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(7.75),
    paddingBottom: theme.spacing(7.75),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tabs/>
    </div>
  );
};
