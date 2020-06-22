import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@/components/text-field";
import {OrderType} from './index';
import Gender from '@/components/radio/gender';
import {getQueryString} from '@fay-react/lib/router';
import {postJson} from '@fay-react/lib/fetch';
// import {getJson} from '@fay-react/lib/fetch';
// import {MTLLoader} from '@/lib/three/examples/jsm/loaders/MTLLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: "relative",
    paddingTop: theme.spacing(2)
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  avatar: {
    width: 120,
    height: 120,
  },
  wrapper: {
    position: 'relative',
  },
  btn: {
    color: '#FFFFFF',
    marginTop: theme.spacing(3)
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  }
}));

declare var wx: any;

export default () => {
  const classes = useStyles();
  
  const initOrder = {
    name: '',
    gender: 2,
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
  }
  const [order, setOrder] = React.useState<OrderType>(initOrder);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState<any>(null);

  React.useEffect(() => {
    const _id = getQueryString('id');
    setId(_id);
    setTimeout(() => {
      wx.miniProgram.getEnv(function(res) { alert(res.miniprogram) })
      wx.miniProgram.switchTab({url: 'pages/shopping-car/index'})
    }, 2000);
  }, [])

  const handleChange = (key: string) => (e: any) => {
    setOrder({...order, [key]: e.target.value});
  }

  React.useEffect(() => {
    if(order.name.length > 0 && order.mobile.length > 0 && 
      order.axialLeft.length > 0 && order.cylMirrorRight.length > 0 && order.prismRight.length > 0 && order.axialRight.length > 0 && 
      order.cylMirrorLeft.length > 0 && order.prismLeft.length > 0 && order.axialLeft.length > 0 && order.interpupillaryDistance.length > 0 && 
      order.pointPupilRight.length > 0 && order.pointPupilLeft.length > 0){
      setDisabled(false);
    }
  }, [JSON.stringify(order)]);

  const handleSubmit = () => {
    // setLoading(true);
    console.log(order);
    postJson({path: '/api/shopping-car/add', data: {...order, openid: id}}).then(res => {
      console.log(res);
      if(res.success){
      }else{
        setLoading(false);
      }
    })
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid container item xs={11} spacing={1}>
          <Grid container item xs={5} justify={"center"} alignItems={"center"}>
            <Grid container item xs={12} justify={"center"}>
              <Box pt={1}>
                <TextField label={"客户姓名"} fullWidth onChange={handleChange('name')}/>
              </Box>
            </Grid>
            
            <Grid container item xs={12} justify={"center"}>
              <Box pt={1}>
                <TextField label={"手机号后四位"} fullWidth onChange={handleChange('mobile')} inputProps={{maxLength: 4}}/>
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={6} justify={"flex-end"} alignItems={"center"}>
            <Avatar className={classes.avatar} src={'/face/'+id+'/face1'} variant={"square"}/>
          </Grid>
          <Grid item xs={1}></Grid>
          
          <Grid container item xs={12}>
            <Box pl={1}>
              <Gender onChange={handleChange('gender')} defaultValue={order.gender}/>
            </Box>
          </Grid>

          {/* <Grid item xs={1}></Grid> */}
          <Grid item xs={11}>
            <Box mt={1}>
              <TextField label={"请录入所选镜架型号"} fullWidth onChange={handleChange('frameModel')}/>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
  
          {/* <Grid item xs={1}></Grid> */}
          <Grid item xs={10}>
            <Box mt={2}>
              <Typography>请录入个人光度信息</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField label={"右眼柱镜"} fullWidth onChange={handleChange('cylMirrorRight')}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label={"右眼棱镜"} fullWidth onChange={handleChange('prismRight')}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label={"棱镜轴向"} fullWidth onChange={handleChange('axialRight')}/>
          </Grid>
          <Grid item xs={1}></Grid>
  
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField label={"左眼柱镜"} fullWidth onChange={handleChange('cylMirrorLeft')}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label={"左眼棱镜"} fullWidth onChange={handleChange('prismLeft')}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label={"棱镜轴向"} fullWidth onChange={handleChange('axialLeft')}/>
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <TextField label={"双眼瞳距"} fullWidth onChange={handleChange('interpupillaryDistance')}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label={"右眼点瞳"} fullWidth onChange={handleChange('pointPupilRight')}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label={"左眼点瞳"} fullWidth onChange={handleChange('pointPupilLeft')}/>
          </Grid>
          <Grid item xs={2}></Grid>
          
          {/* <Grid item xs={1}></Grid> */}
          <Grid container item xs={11}>
            <Box mt={1}>
              <Typography color={"secondary"}>请根据实际度数和数据填写，未确定部分可在购物车中通过”编辑“补充</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid container item xs={9} className={classes.wrapper}>
            <Button
              disabled={disabled || loading}
              className={classes.btn}
              color={"primary"}
              variant={"contained"}
              fullWidth
              onClick={handleSubmit}
            >
              保存并提交至购物车
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </div>
  )
}