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
      backgroundColor: theme.palette.common.white
    },
    header: {
      width: '100%',
      position: 'fixed',
      top: 0,
      zIndex: 99,
      height: 64,
    },
    main: {
      display: 'flex',
    },
    left: {
      position: 'fixed',
      width: '200px',
      backgroundColor: theme.palette.primary.main,
      height: '100vh',
      overflow: 'auto',
      top: 64,
    },
    right: {
      marginLeft: '200px',
      width: 'calc(100% - 200px)',
      padding: theme.spacing(4),
      marginTop: '64px'
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
      <div className={classes.header}>
        <Header/>
      </div>
      <div className={classes.main}>
        <div className={classes.left}>
          <Left/>
        </div>
        <div className={classes.right}>
          {children}
        </div>
      </div>
    </div>
  )
}