import React from 'react';
import { View, Image, Button } from 'remax/one';
import { getSystemInfoSync, navigateTo } from 'remax/wechat';
import {login} from '@/lib/login';
import './index.scss';
import {APPC} from '../style';
import Paper from '@/components/paper';
import {STATIC_SERVER_URL} from '@/env';

const CLASS_PREFIX = APPC+'-home';

export default () => {
  const systemInfo = React.useRef(getSystemInfoSync());
  const {windowWidth} = systemInfo.current;
  const pixelRatio = 2;
  const bannerHeight = (980/1080) * windowWidth * pixelRatio;
  const bannerTop = -bannerHeight*0.16;
  const customizedTop = bannerHeight*0.46;
  const customizedImgHeight = (550/924) * (windowWidth - 48) * pixelRatio;
  const buttonTop = customizedImgHeight*0.55;

  const handleGetuserinfo = (e: any) => {
    console.log(e);
    if(e.detail.userInfo){
      login().then((res: any) => {
        if(res.success){
          console.log(res.openid);
          navigateTo({url: '/pages/custom/index'});
        }else{
          //
        }
      })
    }
  }

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <Image src={STATIC_SERVER_URL + "/banner/1.jpg"} className={CLASS_PREFIX+'-banner'} style={{height: bannerHeight, top: bannerTop}}/>
      <View className={CLASS_PREFIX+'-customized'} style={{top: customizedTop}}>
        <Paper className={CLASS_PREFIX+'-paper'}>
          <View className={CLASS_PREFIX+'-paper-container'}>
            {/* <View className={CLASS_PREFIX+'-paper-container-position'}>
              <ExportIcon/>
              <Text>重庆市江北区港城路</Text>
            </View> */}
            <View className={CLASS_PREFIX+'-paper-container-show'}>
              <Image src={STATIC_SERVER_URL + "/customized/1.png"} className={CLASS_PREFIX+'-paper-container-show-img'} style={{height: customizedImgHeight}}/>
              <Button
                className={CLASS_PREFIX+'-paper-container-show-btn'}
                style={{top: buttonTop}}
                // openType="getPhoneNumber"
                wechat-lang="zh_CN"
                wechat-open-type="getUserInfo"
                wechat-bindgetuserinfo={handleGetuserinfo}
                // onGetPhoneNumber={handleGetuserinfo}
                // onClick={handleGetuserinfo}
                // onGetUserInfo={handleToCustom}
              >
                开始定制1
              </Button>
            </View>
          </View>
        </Paper>
      </View>
    </View>
  );
};
