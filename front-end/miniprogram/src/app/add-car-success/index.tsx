import React from 'react';
import { View, Image, switchTab } from 'remax/one';
import './index.scss';
import {APPC} from '../style';
import {OSS} from '@/env';

const CLASS_PREFIX = APPC+'-custom';

export default () => {

  React.useEffect(() => {
    setTimeout(() => {
      switchTab({url: "/pages/index/index"});
    }, 2000);
  }, [])

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <View className={CLASS_PREFIX+'-container'}>
        <Image src={OSS+'/icon/success-circle.png'} className={CLASS_PREFIX+'-container-img'}/>
        <View className={CLASS_PREFIX+'-container-text'}>
          谢谢下单，已成功提交至购物车
        </View>
      </View>
    </View>
  );
};
