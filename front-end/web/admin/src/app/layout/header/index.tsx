import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './menu';
import {getUser} from '@fay-react/lib/user';
import {ManagerType} from '@/app/manager';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.common.white,
    background: theme.palette.primary.dark,
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

export default () => {
  const classes = useStyles();
  const userFromCookie = getUser();
  const [user, setUser] = React.useState<ManagerType|null>(null);

  React.useEffect(() => {
    setUser(userFromCookie);
  }, [JSON.stringify(userFromCookie)]);

  return (
    <div className={classes.root}>
      <div className={classes.topLeft}>
        华视高科技
      </div>
      <div className={classes.topRight}>
        {
          user &&
          <Menu user={user}/>
        }
      </div>
    </div>
  );
};


