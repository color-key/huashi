import React from 'react';
import T3D from './GTLF3D';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BASE_URL} from '@/env';
import {getQueryString} from '@fay-react/lib/router';
import CircularProgress from "@material-ui/core/CircularProgress";
import {postJson} from '@fay-react/lib/fetch';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(4, 2)
  },
  btn: {
    marginTop: theme.spacing(4),
    color: theme.palette.common.white
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '55%',
    left: '50%',
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative',
  }
}))

const initOrder = {
  name: '',
  gender: 0,
  mobile: '',
  frameModel: '',
  cylMirrorRight: '',
  prismRight: '',
  axialRight: '',
  cylMirrorLeft: '',
  prismLeft: '',
  axialLeft: '',
  interpupillaryDistance: '',
  pointPupilRight: '',
  pointPupilLeft: '',
  remark: '',
}

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleButton = () => {
    const _userId = getQueryString('userId');
    setLoading(true);
    postJson({path: BASE_URL+'/shopping-car/add', data: {...initOrder, openid: _userId}}).then(res => {
      console.log(res);
      if(res.success){
        wx.miniProgram.switchTab({
          url:'/pages/shopping-car/index',
          success: function(){
            console.log('success')
          },
          fail: function(){
            console.log('fail');
          },
          complete:function(){
            console.log('complete');
          }
        });
      }else{
        setLoading(false);
      }
    })
  }

  React.useEffect(() => {
    document.title="人脸3D头像";
  },[]);

  return (
    <div className={classes.root}>
      <T3D/>
      <div className={classes.wrapper}>
        <Button disabled={loading} onClick={handleButton} className={classes.btn} color={"primary"} variant={"contained"} fullWidth>下一步</Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  )
}