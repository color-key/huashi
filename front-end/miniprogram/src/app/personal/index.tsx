import React from 'react';
import { View, Image, Button } from 'remax/one';
import { getUserInfo, showLoading, hideLoading, navigateTo } from 'remax/wechat';
import './index.scss';
import {APPC} from '../style';
import Address from './address';
import Order from './order';
import {login} from '@/lib/login';

const CLASS_PREFIX = APPC+'-personal';

export default () => {
  const [user, setUser] = React.useState<any>(null);

  const getData = React.useCallback(() => {
    getUserInfo({
      lang: 'zh_CN',
      success(userInfoRes) {
        setUser(userInfoRes.userInfo);
      }
    })
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

  const handleGetuserinfo = (e: any) => {
    if(e.detail.userInfo){
      login().then((res: any) => {
        if(res.success){
          getData();
        }else{
          //
        }
      })
    }
  }

  return (
    <View className={CLASS_PREFIX+'-root'}>
      {
        user ?
        <View>
          <View className={CLASS_PREFIX+'-top'}>
            <Image src={user.avatarUrl} className={CLASS_PREFIX+'-avatar'}/>
            <View className={CLASS_PREFIX+'-userInfo'}>
              <View>
                {user.nickName}
              </View>
              <View>
                {user.country} {user.province} {user.city} 
              </View>
            </View>
          </View>
          <Address/>
          <Order/>
          <View className={CLASS_PREFIX+'-tip'}>友情提醒：每日13点前提交订单视为当日订单</View>
        </View>
        :
        <View>
          <View className={CLASS_PREFIX+'-top'}>
            <Image src={'/static/personal/user.png'} className={CLASS_PREFIX+'-avatar'}/>
            <View className={CLASS_PREFIX+'-userInfo'}>
              <View>
                <Button
                  className={CLASS_PREFIX+'-login'}
                  // openType="getPhoneNumber"
                  wechat-lang="zh_CN"
                  wechat-open-type="getUserInfo"
                  wechat-bindgetuserinfo={handleGetuserinfo}
                  // onGetPhoneNumber={handleGetuserinfo}
                  // onClick={handleGetuserinfo}
                  // onGetUserInfo={handleToCustom}
                >
                  登录
                </Button>
              </View>
              <View>
              </View>
            </View>
          </View>
        </View>
      }
    </View>
  );
};
