import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import NoviceGuide from './novice-guide';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box mt={2} pb={2}>
        <NoviceGuide/>
      </Box>
    </div>
  )
}