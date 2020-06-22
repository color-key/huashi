import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Router from 'next/router'
import { User } from '@/app/user';
import {removeUser} from '@fay-react/lib/user';
import {remove as removeCookie} from '@fay-react/lib/cookie';
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL} from '@/env';

interface Props{
  user: User
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      color: theme.palette.common.white
    },
    paper: {
      zIndex: 10,
      width: 160
    },
    typography: {
      margin: theme.spacing(0, 1),
    }
  }),
);

export default ({user}: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>, path?: string) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
    path && Router.push( '/pc' + path);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const username = user && (user.name || user.email || user.mobileNo);
  console.log(user)

  const handleLogout = () => {
    getJson({path: BASE_SERVICE_URL+'/logout'});
    removeUser();
    removeCookie("OAUTH2SESSION");
    removeCookie("JSESSIONID");
    Router.reload();
  }

  return (
    <>
      <Button
        className={classes.btn}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={<PersonOutlineIcon />}
        endIcon={<ExpandMoreIcon />}
      >
        {username}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className={classes.paper}>
        {({ TransitionProps, placement }) => (
        <Grow
        {...TransitionProps}
        style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={(e) => handleClose(e, '/setting')}>账户设置</MenuItem>
                <MenuItem onClick={(e) => handleClose(e, '/contract/list')}>我的合约</MenuItem>
                <MenuItem onClick={(e) => handleClose(e, '/order/list')}>我的订单</MenuItem>
                <MenuItem onClick={handleLogout}>退出</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
        )}
      </Popper>
    </>
  );
}
