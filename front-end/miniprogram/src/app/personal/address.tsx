import React from 'react';
import { View, Image, Text } from 'remax/one';
import { navigateTo } from 'remax/wechat';
import {APPC} from '../style';
import Paper from '@/components/paper';

const CLASS_PREFIX = APPC+'-personal-address';

export default () => {
  
  const handleTap = () => {
    navigateTo({url: "/pages/address/index"});
  }

  return (
    <Paper className={CLASS_PREFIX+'-root'} onTap={handleTap}>
      <View className={CLASS_PREFIX+'-container'}>
        <View className={CLASS_PREFIX+'-container-left'}>
          <Image src="/static/personal/location.png" className={CLASS_PREFIX+'-container-img'}/>
          <Text>我的地址</Text>
        </View>
        <Image src="/static/arrow/right.png" className={CLASS_PREFIX+'-img'}/>
      </View>
    </Paper>
  );
};
