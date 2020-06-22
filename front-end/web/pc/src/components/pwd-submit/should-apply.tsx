import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Dialog from "@/components/dialog";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    center: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    head: {
      fontSize: 28,
      color: grey[900],
      fontWeight: 500,
    },
    tip: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6)
    },
    login: {
      height: 56,
    },
    tipMore: {
      color: red[300]
    }
  })
);
export interface Props {
  open: boolean;
  title?: string;
  des?: string;
  onClose: (() => void) | undefined;
}

export default ({ open = false, title = '修改成功', des = '密码修改成功', ...props }: Props) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={props.onClose}>
      <div className={clsx(classes.root, classes.center)}>
        <div className={classes.head}>{title}</div>
        <div className={classes.tip}>{des}</div>
        <Button className={classes.login} fullWidth onClick={props.onClose} color={"primary"} variant={"contained"}>确定</Button>
      </div>
    </Dialog>
  )
}