import React from 'react';
import Banner from './banner';
import Services from './services';
import WhatIs from './whatIs';
import WhyChose from './whyChose';
import Investment from './investment';
import Partner from './partner';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Banner/>
      <Services/>
      <WhatIs/>
      <WhyChose/>
      <Investment/>
      <Partner/>
    </div>
  )
}