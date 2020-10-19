import React from 'react';
import { View, Image, Button } from 'remax/one';
import { SwiperItem } from 'remax/wechat';
import {APPC} from '../style';

const CLASS_PREFIX = APPC+'-home';

export default ({img, text, bindgetuserinfo}: any) => {

  return (
    <SwiperItem className={CLASS_PREFIX+'-swiperItem'}>
      <View className={CLASS_PREFIX+'-swiperItem-card'}>
        <Image mode={'aspectFit'} src={img} className={CLASS_PREFIX+'-swiperItem-img'}/>
        <View className={CLASS_PREFIX+'-swiperItem-text'}>{text}</View>
        <Button
          className={CLASS_PREFIX+'-swiperItem-btn'}
          wechat-lang="zh_CN"
          wechat-open-type="getUserInfo"
          wechat-bindgetuserinfo={bindgetuserinfo}
        >
          马上定制
        </Button>
      </View>
    </SwiperItem>
  );
};
