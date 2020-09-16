import React from 'react';
import { View, Image, Button } from 'remax/one';
import { navigateTo, showLoading, hideLoading, request, showModal, SwiperItem } from 'remax/wechat';
import {login} from '@/lib/login';
import {APPC} from '../style';
import {SERVER_URL} from '@/env';

const CLASS_PREFIX = APPC+'-home';

export default ({img, text}: any) => {

  const handleGetuserinfo = (e: any) => {
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
    <SwiperItem className={CLASS_PREFIX+'-swiperItem'}>
      <View className={CLASS_PREFIX+'-swiperItem-card'}>
        <Image mode={'aspectFit'} src={img} className={CLASS_PREFIX+'-swiperItem-img'}/>
        <View className={CLASS_PREFIX+'-swiperItem-text'}>{text}</View>
        <Button
          className={CLASS_PREFIX+'-swiperItem-btn'}
          wechat-lang="zh_CN"
          wechat-open-type="getUserInfo"
          wechat-bindgetuserinfo={handleGetuserinfo}
        >
          马上定制
        </Button>
      </View>
    </SwiperItem>
  );
};
