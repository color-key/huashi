import React from 'react';
import { View, Image, Button, Text } from 'remax/one';
import { getSystemInfoSync, navigateTo, showLoading, showToast, hideLoading, request, getLocation, Map, showModal } from 'remax/wechat';
import {login} from '@/lib/login';
import './index.scss';
import {APPC} from '../style';
import Paper from '@/components/paper';
import {STATIC_SERVER_URL, SERVER_URL} from '@/env';
import {getAuthLocation} from '@/lib/auth';
const bmap = require('@/lib/bmap/bmap-wx.js');

var BMap = new bmap.BMapWX({ 
  ak: 'loPt7GI0YFPyGCEZKGCqaUDbAyqfpG9k' 
});

const CLASS_PREFIX = APPC+'-home';

export default () => {
  const [map, setMap] = React.useState<any>(null);
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
    showLoading();
    if(e.detail.userInfo){
      login().then((res: any) => {
        if(res.success){
          console.log(res.openid);
          request({
            url: SERVER_URL+'/user/getByOpenid/'+res.openid,
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res: any) {
              if(res.data.success && res.data.result[0]){
                const user = res.data.result[0];
                if(user.status === 'PASS'){
                  navigateTo({url: '/pages/custom/index'});
                }else if(user.status === 'REJECT'){
                  showModal({title: '很抱歉！您的账户审核未通过，无法使用', showCancel: false});
                }else{
                  showModal({title: '很抱歉！您的账户在审核中，待审核通过后方可使用', showCancel: false});
                }
              }
            },
            complete(){
              hideLoading();
            }
          })
        }else{
          hideLoading();
        }
      })
    }
  }

  React.useEffect(() => {
    getAuthLocation().then((res: any) => {
      console.log(res);
      if(res['scope.userLocation']){
      BMap.regeocoding({ 
        fail: (res: any)=>{console.log(res)},
        success: (res: any)=>{
          console.log(res);
          setMap(res.wxMarkerData);
        },
        iconPath: '/static/map/marker_red.png',
        iconTapPath: '/static/map/marker_red.png' 
      });
    }
    })
  }, []);

  const handleMarkerClick = (e: any) => {
    console.log(e);
  }

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <Image src={STATIC_SERVER_URL + "/banner/1.jpg"} className={CLASS_PREFIX+'-banner'} style={{height: bannerHeight, top: bannerTop}}/>
      <View className={CLASS_PREFIX+'-customized'} style={{top: customizedTop}}>
        <Paper className={CLASS_PREFIX+'-paper'}>
          <View className={CLASS_PREFIX+'-paper-container'}>
            {
              map &&
              <View>
                <View className={CLASS_PREFIX+'-paper-container-position'}>
                  <Image src={"/static/personal/location_on.png"} className={CLASS_PREFIX+'-location'}/>
                  <Text>{map[0].address}</Text>
                </View>
                {/* <View className={CLASS_PREFIX+'-paper-container-map'}>
                <Map id="map" longitude={map[0].longitude} latitude={map[0].latitude} scale={14} showLocation={true} markers={map} onMarkerClick={handleMarkerClick}></Map>
                </View> */}
              </View>
            }
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
                开始定制
              </Button>
            </View>
          </View>
        </Paper>
      </View>
    </View>
  );
};
