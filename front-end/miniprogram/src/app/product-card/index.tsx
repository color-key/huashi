import React from 'react';
import { View, Image, Button } from 'remax/one';
// import { chooseImage, getFileSystemManager, request, showToast, showLoading, hideLoading, navigateTo } from 'remax/wechat';
import './index.scss';
import {APPC} from '../style';
import Paper from '@/components/paper';
import {SERVER_URL} from '@/env';

const CLASS_PREFIX = APPC+'-product-card';

export default ({data, selected=false, onTap, order=false}: any) => {
  // const [state, setState] = React.useState({faceFront: null, faceLeft: null, faceRight: null});
  // const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    // setDisabled([state.faceFront, state.faceLeft, state.faceRight].includes(null))
  }, []);

  const statusText: any = {
    'PENDING': '待审核',
    'PASS': '已发货',
    'REJECT': '审核未通过',
  }

  return (
    <Paper className={CLASS_PREFIX+'-root'} onTap={onTap}>
      {
        order &&
        <View className={CLASS_PREFIX+'-header'}>
          <View>订单编号：{data.order_no}</View>
          <View>{data.creation_datetime}</View>
          <View>{statusText[data.status]}</View>
        </View>
      }
      <View className={CLASS_PREFIX+'-container'}>
        {
          order ||
          <View className={CLASS_PREFIX+'-left'}>
            <Image className={CLASS_PREFIX+'-check'} src={'/static/check/'+(selected?'checked':'check')+'.png'}/>
          </View>
        }
        <View className={CLASS_PREFIX+'-person'}>
          <Image src={SERVER_URL+"/face/"+data.id+"/face1"} className={CLASS_PREFIX+'-img'}/>
        </View>
        <View className={CLASS_PREFIX+'-eye'}>
          <View>{data.name} {data.gender===1?'女士':data.gender===0?'先生':''} {data.mobile}</View>
          <View>型号：{data.frame_model}</View>
          <View>光度信息：</View>
          <View className={CLASS_PREFIX+'-info'}>
            <View>R: {data.cyl_mirror_right};{data.prism_right}/{data.axial_right}</View>
          </View>
          <View className={CLASS_PREFIX+'-info'}>
            <View>L: {data.cyl_mirror_left};{data.prism_left}/{data.axial_left}</View>
          </View>
          <View className={CLASS_PREFIX+'-info'}>
            <View>PD: {data.interpupillary_distance}</View>
            <View>VD: {data.point_pupil_right}/{data.point_pupil_left}</View>
          </View>
        </View>
      </View>
    </Paper>
  );
};
