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
import Typography from '@material-ui/core/Typography';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import {getUser} from '@fay-react/lib/user';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {PATH_PREFIX} from '@/env';
// import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      width: '100%',
      height: '100%',
    },
    title: {
      position: 'absolute',
      zIndex: 4,
      padding: '15px',
      margin: '15px',
      display: 'flex',
      alignItems: 'center',
      width: 'calc(100% - 30px)',
      borderBottom: '1px solid #666',
    },
    titleTypography: {
      marginLeft: theme.spacing(2)
    },
    list: {
      position: 'absolute',
      top: 100,
      // color: theme.palette.common.white,
      zIndex: 4,
      width: '100%',
    },
    icon: {
      color: theme.palette.common.white,
      minWidth: '40px',
    },
    listItemWrapper: {
      cursor: 'pointer'
    },
    listItem: {
      margin: '10px 15px 0',
      width: 'auto',
      '&:hover':{
        backgroundColor: 'transparent',
      },
    },
    listItemActive: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)',
      '&:hover':{
        backgroundColor: theme.palette.primary.main,
      }
    },
    text: {
      paddingTop: '2px'
    },
    bg: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      position: 'absolute',
      // backgroundImage: `url("${PATH_PREFIX}/static/bg/sidebar-2.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      '&:after': {
        width: '100%',
        height: '100%',
        content: '""',
        opacity: '.8',
        zIndex: 3,
        position: 'absolute',
        background: theme.palette.common.black,
      }
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

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {/* <Avatar sizes={"24px"} alt="Tianlad" src={PATH_PREFIX + "/static/logo/tianlad.png"} /> */}
        <Typography variant={"h6"} className={classes.titleTypography}>华视高科技</Typography>
      </div>
      <List component="nav" className={classes.list} aria-label="contacts">
        {
          navData.map((item, index) => {
            const active = Router.pathname === PATH_PREFIX+item.path;
            return (
              <Link key={index} href={PATH_PREFIX+item.path}>
                <div className={classes.listItemWrapper}>
                  <ListItem button className={clsx(classes.listItem, {[classes.listItemActive]: active})}>
                    <ListItemIcon className={classes.icon}>
                      <item.icon/>
                    </ListItemIcon>
                    <ListItemText primary={item.text} className={classes.text}/>
                  </ListItem>
                </div>
              </Link>

            )
          })
        }
      </List>
      <div className={classes.bg} style={{backgroundImage: `url("${PATH_PREFIX}/static/bg/sidebar-2.jpg")`}}></div>
    </div>
  )
}