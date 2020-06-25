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
import { ManagerType } from '@/app/manager';
import {removeUser} from '@fay-react/lib/user';
import {PATH_PREFIX} from '@/env';

interface Props{
  user: ManagerType
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

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    removeUser();
    Router.push(PATH_PREFIX+'/login');
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
        {user.username}
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
