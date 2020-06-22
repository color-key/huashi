import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import Desc from '@/app/contract/detail/desc';
import { Theme } from '@/components/theme';

interface Props{
  text: string
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: 500,
    padding: theme.spacing(4)
  },
}));

export default ({text}: Props) => {
  const classes = useStyles();
  const handleContract = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpen(true);
  }
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <Link onClick={handleContract}>{text}</Link>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <div className={classes.content}>
          <Desc/>
        </div>
      </Drawer>
    </>
  );
}
