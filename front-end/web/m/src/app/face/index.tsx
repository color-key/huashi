import React from 'react';
import T3D from './3D';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';
import {getQueryString} from '@fay-react/lib/router';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(4, 2)
  },
  btn: {
    marginTop: theme.spacing(4),
    color: theme.palette.common.white
  }
}))

// declare var wx: any;

export default () => {
  const classes = useStyles();

  const handleButton = () => {
    const id = getQueryString('id');
    Router.push(PATH_PREFIX+'/order?id='+id);
    // wx.miniProgram.navigateTo({url: '/pages/order/index'})
  }

  React.useEffect(() => {
    document.title="人脸3D头像";
  },[]);

  return (
    <div className={classes.root}>
      <T3D/>
      <Button onClick={handleButton} className={classes.btn} color={"primary"} variant={"contained"} fullWidth>下一步</Button>
    </div>
  )
}