import React from 'react';
import { View, Image, Text } from 'remax/one';
import { showLoading, hideLoading, request } from 'remax/wechat';
import {APPC} from '../style';
import Paper from '@/components/paper';
import {chooseAddress} from '@/lib/wechat';
import {SERVER_URL} from '@/env';
import {login} from '@/lib/login';

const CLASS_PREFIX = APPC+'-personal-address';

interface Address{
  userName: string
  postalCode: string
  provinceName: string
  cityName: string
  countyName: string
  detailInfo: string
  nationalCode: string
  telNumber: string
}

export default () => {

  const [address, setAddress] = React.useState<any>(null);

  const getData = () => {
    showLoading();
    login().then((loginRes: any) => {
      request({
        url: SERVER_URL+'/user/getByOpenid/'+loginRes.openid,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res: any) {
          if(res.data.success && res.data.result[0]){
            setAddress(JSON.parse(res.data.result[0].address));
          }
        },
        complete(){
          hideLoading();
        }
      })
    })
  }

  React.useEffect(() => {
    getData();
  }, []);
  
  const handleGetAddress = async () => {
    const loginRes: any = await login();
    const addressRes = await chooseAddress();
    if(loginRes.success){
      showLoading({title: '正在保存地址'});
      request({
        url: SERVER_URL+'/user/updAddress',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: loginRes.openid,
          address: JSON.stringify(addressRes)
        },
        success (res: any) {
          getData();
        },
        complete(){
          hideLoading();
        }
      })
    }
  }

  return (
    <Paper className={CLASS_PREFIX+'-root'} onTap={handleGetAddress}>
      <View className={CLASS_PREFIX+'-container'}>
        <View className={CLASS_PREFIX+'-container-left'}>
          <Image src="/static/personal/location.png" className={CLASS_PREFIX+'-container-img'}/>
          <Text>我的地址</Text>
        </View>
        <Image src="/static/arrow/right.png" className={CLASS_PREFIX+'-img'}/>
      </View>
      {
        address &&
        <View className={CLASS_PREFIX+'-address'}>
          <View className={CLASS_PREFIX+'-address-item'}>
            <Text>{address.userName}</Text>
            <Text>{address.telNumber}</Text>
            <Text>{address.postalCode}</Text>
          </View>
          <View className={CLASS_PREFIX+'-address-item'}>
            <Text>{address.provinceName}</Text>
            <Text>{address.cityName}</Text>
            <Text>{address.countyName}</Text>
          </View>
          <View className={CLASS_PREFIX+'-address-item'}>
            <Text>{address.detailInfo}</Text>
          </View>
        </View>
        
      }
    </Paper>
  );
};
