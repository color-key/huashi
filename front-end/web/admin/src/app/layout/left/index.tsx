/**
 * Create by fay on 4/22/20 8:33 上午
 */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import clsx from 'clsx';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import {getUser} from '@fay-react/lib/user';
import {useRouter} from 'next/router';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white
    },
    icon: {
      color: theme.palette.common.white,
      minWidth: '40px',
    },
    listItem: {
      marginBottom: theme.spacing(2),
      '&:hover':{
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        '& .MuiListItemIcon-root': {
          color: theme.palette.primary.main,
        }
      },
    },
    listItemActive: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
    iconActive: {
      color: theme.palette.primary.main
    },
    text: {
      paddingTop: '2px'
    }
  }),
);

const navData = [{
  icon: SupervisorAccountIcon,
  text: '管理员',
  path: ''
},{
  icon: ListAltIcon,
  text: '订单管理',
  path: '/order'
},{
  icon: GroupIcon,
  text: '用户管理',
  path: '/user'
}]

export default () => {
  const classes = useStyles();
  const Router = useRouter();

  React.useEffect(() => {
    // const user = getUser();
    // console.log(user);
    // if(!user){
    //   Router.push(PATH_PREFIX+'/login');
    // }
  }, [])

  const handleChange = (path: string) => () => {
    Router.push(PATH_PREFIX+path);
  }
console.log(Router.pathname);
  return (
    <div className={classes.root}>
      <List component="nav" className={classes.root} aria-label="contacts">
        {
          navData.map((item, index) => {
            const active = Router.pathname === PATH_PREFIX+item.path;
            return (
              <ListItem key={index} button onClick={handleChange(item.path)} className={clsx(classes.listItem, {[classes.listItemActive]: active})}>
                <ListItemIcon className={clsx(classes.icon, {[classes.iconActive]: active})}>
                  <item.icon/>
                </ListItemIcon>
                <ListItemText primary={item.text} className={classes.text}/>
              </ListItem>
            )
          })
        }
      </List>
    </div>
  )
}