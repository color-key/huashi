import React from 'react';
import { View, Image, Text } from 'remax/one';
import { navigateTo } from 'remax/wechat';
import {APPC} from '../style';
import Paper from '@/components/paper';

const CLASS_PREFIX = APPC+'-personal-order';

export default () => {
  
  const handleTap = () => {
    navigateTo({url: "/pages/order-list/index"});
  }

  return (
    <Paper className={CLASS_PREFIX+'-root'} onTap={handleTap}>
      <View className={CLASS_PREFIX+'-container'}>
        <View className={CLASS_PREFIX+'-container-left'}>
          <Image src="/static/personal/order.png" className={CLASS_PREFIX+'-container-img'}/>
          <Text>我的订单</Text>
        </View>
        <Image src="/static/arrow/right.png" className={CLASS_PREFIX+'-img'}/>
      </View>
    </Paper>
  );
};
