import React from 'react';
import T3D from './3D';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Img from './img';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(4, 2),
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
    flexFlow: 'column'
  },
  container: {
    width: 500,
  }
}))

export default () => {
  const classes = useStyles();

  React.useEffect(() => {
    const title = document.title;
    document.title = "人脸3D头像";
    return () => {
      document.title = title;
    }
  },[]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <T3D/>
      </div>
      <Img/>
    </div>
  )
}