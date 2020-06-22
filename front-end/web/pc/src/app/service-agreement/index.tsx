import React from 'react';
import Banner from './banner';
import { makeStyles } from "@material-ui/core/styles";
import Agreement from "./agreement";

const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Banner />
      <Agreement />
    </div>
  )
}