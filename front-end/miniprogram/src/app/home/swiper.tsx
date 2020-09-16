import React from 'react';
import { View, Image } from 'remax/one';
import { getSystemInfoSync, Swiper } from 'remax/wechat';
import {APPC} from '../style';
import {OSS} from '@/env';
import SwiperItem from './swiper-item';

const CLASS_PREFIX = APPC+'-home';

const data = [{
  img: OSS+'/home/eyeglass/0001.png',
  text: 'BURGUNDY/BLACK'
},{
  img: OSS+'/home/eyeglass/0002.png',
  text: 'BURGUNDY/BLACK'
},{
  img: OSS+'/home/eyeglass/0003.png',
  text: 'BLACK/CRYSTAL'
},{
  img: OSS+'/home/eyeglass/0004.png',
  text: 'BLACK/CRYSTAL'
},{
  img: OSS+'/home/eyeglass/0005.png',
  text: 'BLACK/NAVY'
},{
  img: OSS+'/home/eyeglass/0006.png',
  text: 'BLACK/NAVY'
},{
  img: OSS+'/home/eyeglass/0007.png',
  text: 'BLACK/GRAY'
},{
  img: OSS+'/home/eyeglass/0008.png',
  text: 'BLACK/GRAY'
}]

export default () => {
  const systemInfo = React.useRef(getSystemInfoSync());
  const {windowWidth} = systemInfo.current;
  const pixelRatio = 2;
  const customizedImgHeight = (404/750) * windowWidth * pixelRatio;
  const customizedTitleTop = customizedImgHeight*(13/202);

  return (
    <View className={CLASS_PREFIX+'-customized'}>
      <View className={CLASS_PREFIX+'-paper-container'}>
        <View className={CLASS_PREFIX+'-paper-container-show'}>
          <Swiper className={CLASS_PREFIX+'-swiper'} autoplay interval={5000} duration={2000} previousMargin={'100px'} nextMargin={'100px'} circular>
            {
              data.map((item, index) => {
                return <SwiperItem key={index} img={item.img} text={item.text}/>
              })
            }
          </Swiper>
          <View className={CLASS_PREFIX+'-customized-title'} style={{top: customizedTitleTop}}>
            <View className={CLASS_PREFIX+'-customized-title-bg'}/>
            <Image src={OSS + "/home/eye@2x.png"} className={CLASS_PREFIX+'-customized-title-eye'}/>
            <View className={CLASS_PREFIX+'-customized-title-text'}>新品发布</View>
          </View>
        </View>
      </View>
    </View>
  );
};