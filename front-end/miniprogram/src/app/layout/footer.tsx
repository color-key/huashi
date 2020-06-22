import React from 'react';
import {View, Image} from 'remax/one';
import {makePhoneCall} from 'remax/wechat';
import {APPC} from '../style';

const CLASS_PREFIX = APPC + '-layout-footer';

export type ActiveType = 'home' | 'shopping-car' | 'personal';

interface Props{
  active?: ActiveType
}

export default ({active}: Props) => {

  const handlePhone = () => {
    makePhoneCall({
      phoneNumber: '1383838438'
    })
  }

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <View className={CLASS_PREFIX+'-tab1'}>
        <View>联系我们</View>
      </View>
      <View className={CLASS_PREFIX+'-tab2'} onTap={handlePhone}>
        <Image src={"/static/contact/phone.png"} className={CLASS_PREFIX+'-img'} />
      </View>
      {/* <View className={CLASS_PREFIX+'-tab2'}>
        <Image src={"/static/contact/wechat.png"} className={CLASS_PREFIX+'-img'} />
      </View> */}
    </View>
  )
}