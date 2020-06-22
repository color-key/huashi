import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from './tabs';
import Button from '@material-ui/core/Button';
import LogoIcon from '@/components/icons/logo/logo1';
import Menu from './menu';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';
import {getUser} from '@fay-react/lib/user';
import {User} from '@/app/user';

const height = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.common.white,
    background: theme.palette.common.black,
    boxShadow: '0px 1px 0px 0px rgba(255,255,255,0.24)',
    padding: '0 32px'
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    height: "100%",
  },
  topRight: {
    // width: 128
  },
  homeIcon: {
    width: 192,
    height: 40
  },
  homeText: {
    marginLeft: '20px',
    fontSize: 30,
    fontWeight: 'bold'
  },
  login: {
    color: theme.palette.common.white
  },
  register: {

  },
}));

export default ({showNavigation, showPersonal}: any) => {
  const classes = useStyles();
  const userFromCookie = getUser();
  const [user, setUser] = React.useState<User|null>(null);

  React.useEffect(() => {
    setUser(userFromCookie);
  }, [JSON.stringify(userFromCookie)]);
  return (
    <div className={classes.root}>
      <div className={classes.topLeft}>
        <Button onClick={() => Router.push(PATH_PREFIX + '/')}><LogoIcon className={classes.homeIcon}/></Button>
        {showNavigation && <Tabs/>}
      </div>
      {
        showPersonal &&
        <div className={classes.topRight}>
          {
            user ?
            <Menu user={user}/>
            :
            <>
              <Button variant="outlined" className={classes.login} onClick={() => Router.push(PATH_PREFIX + '/login')}>
                登录
              </Button>
              <Button color={"primary"} variant="contained" className={classes.register} onClick={() => Router.push(PATH_PREFIX + '/register')}>
                注册
              </Button>
            </>
          }
        </div>
      }
      
    </div>
  );
};


