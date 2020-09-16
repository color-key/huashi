import React from 'react';
import { View, Image, Button } from 'remax/one';
import { getSystemInfoSync, navigateTo, showLoading, hideLoading, request, showModal } from 'remax/wechat';
import {login} from '@/lib/login';
import './index.scss';
import {APPC} from '../style';
import {OSS, SERVER_URL} from '@/env';
import Swiper from './swiper';

const CLASS_PREFIX = APPC+'-home';

export default () => {
  const systemInfo = React.useRef(getSystemInfoSync());
  const {windowWidth} = systemInfo.current;
  const pixelRatio = 2;
  const bannerHeight = (544/750) * windowWidth * pixelRatio;
  const customizedImgHeight = (404/750) * windowWidth * pixelRatio;
  const bannerTextTop = bannerHeight*(134/272);
  const buttonTop = customizedImgHeight*(151/202);
  const customizedTitleTop = customizedImgHeight*(13/202);

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

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <View className={CLASS_PREFIX+'-banner'}>
        <Image src={OSS + "/home/banner@2x.png"} className={CLASS_PREFIX+'-banner-img'} style={{height: bannerHeight}}/>
        <View className={CLASS_PREFIX+'-banner-text'} style={{top: bannerTextTop}}>
          <View className={CLASS_PREFIX+'-banner-text-1'}>
            3D打印定制眼镜
          </View>
          <View className={CLASS_PREFIX+'-banner-text-2'}>
            玩出自己的风格
          </View>
        </View>
      </View>
      <Swiper/>
      <View className={CLASS_PREFIX+'-customized'}>
          <View className={CLASS_PREFIX+'-paper-container'}>
            <View className={CLASS_PREFIX+'-paper-container-show'}>
              <Image src={OSS + "/home/show@2x.png"} className={CLASS_PREFIX+'-paper-container-show-img'} style={{top: customizedImgHeight}}/>
              <View className={CLASS_PREFIX+'-customized-title'} style={{top: customizedTitleTop}}>
                <View className={CLASS_PREFIX+'-customized-title-bg'}/>
                <Image src={OSS + "/home/eye@2x.png"} className={CLASS_PREFIX+'-customized-title-eye'}/>
                <View className={CLASS_PREFIX+'-customized-title-text'}>眼镜定制</View>
              </View>
              <Button
                className={CLASS_PREFIX+'-paper-container-show-btn'}
                style={{top: buttonTop}}
                wechat-lang="zh_CN"
                wechat-open-type="getUserInfo"
                wechat-bindgetuserinfo={handleGetuserinfo}
              >
                开始定制
              </Button>
            </View>
          </View>
      </View>
    </View>
  );
};
