import React from 'react';
import Banner from './banner';
import Navigation from './navigation';
import News from './news';
import Guide from './novice-guide';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Banner />
      <Navigation />
      <News />
      <Guide />
    </div>
  )
}