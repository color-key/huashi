/**
 * Create by fay on 4/22/20 8:33 上午
 */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {getUser} from '@fay-react/lib/user';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';
import Left from './left';
import Header from './header';

interface Props{
  children?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: theme.palette.common.white
    },
    header: {
      height: 64,
    },
    main: {
      display: 'flex',
    },
    left: {
      position: 'fixed',
      width: '260px',
      // backgroundColor: theme.palette.primary.main,
      height: '100vh',
      overflow: 'auto',
      boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
      // top: 64,
    },
    right: {
      marginLeft: '260px',
      width: 'calc(100% - 260px)',
      padding: theme.spacing(0, 4),
    }
  }),
);

export default ({children}: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    const user = getUser();
    console.log(user);
    if(!user){
      Router.push(PATH_PREFIX+'/login');
    }
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.left}>
          <Left/>
        </div>
        <div className={classes.right}>
          <div className={classes.header}>
            <Header/>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}