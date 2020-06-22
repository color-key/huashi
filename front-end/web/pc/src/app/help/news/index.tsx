import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import News from "./news";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#FAFAFA',
    display: 'flex',
    justifyContent: 'center'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <News/>
    </div>
  )
}