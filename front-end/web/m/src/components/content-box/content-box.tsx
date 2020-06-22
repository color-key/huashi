import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

const width = 1200;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    width,
  },
}));

export default ({children, className, ...props}: any) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...props}>
      <div className={classes.content}>
        {children}
      </div>
    </Box>
  );
};
