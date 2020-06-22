import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Content from './content';
import FriendlyLink from './friendly-link';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

export default () => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 600);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  return (
    <Slide
      direction={"up"}
      in={show}
      timeout={500}
    >
      <div className={classes.root}>
        <Content/>
        <FriendlyLink/>
      </div>
    </Slide>
  );
};
