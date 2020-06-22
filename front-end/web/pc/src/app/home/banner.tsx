import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Top from '@/app/home/top';
import {PATH_PREFIX} from '@/env';
import ViewGrow from '@/components/view-grow';

const height = 448;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    backgroundColor: theme.palette.common.black,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat center`,
    backgroundSize: 'cover'
  },
  content: {
    height,
    color: theme.palette.common.white,
    width: '100%',
  },
  main: {
    paddingTop: '152px'
  },
  homeIcon: {
    fontSize: 33,
  },
  homeText: {
    marginLeft: '20px',
    fontSize: 30,
    fontWeight: 'bold'
  },
  title1: {
    fontSize: '3.5rem',
    fontWeight: 'bold'
  },
  title2: {
    marginTop: '40px',
    fontSize: '1.875rem'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {/*<Top/>*/}
        <ViewGrow>
          <div className={classes.main}>
            <Typography variant={"body2"} align={"center"} className={classes.title1}>Filecoin：Get Filecoin with Ease</Typography>
            <Typography variant={"body2"} align={"center"} className={classes.title2}>0服务费抢占filecoin挖矿头矿福利</Typography>
          </div>
        </ViewGrow>
      </div>
    </div>
  );
};
