import React from 'react';
import Banner from './banner';
import { makeStyles } from "@material-ui/core/styles";
import Us from './us';
import Keystore from './keystore';

const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Banner />
      <Us />
      <Keystore />
    </div>
  )
}