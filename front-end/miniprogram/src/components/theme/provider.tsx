import React from 'react';
import {View} from 'remax/one';
import {getSystemInfoSync} from 'remax/wechat';
// import './provider.scss';

export default ({children}: any) => {
  const systemInfo = React.useRef(getSystemInfoSync());
  const {pixelRatio} = systemInfo.current;

  return (
    <View style={{zoom: pixelRatio}}>{children}</View>
  )
}