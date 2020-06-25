import React from 'react';
import { View, Button } from 'remax/one';
import { usePageEvent } from 'remax/macro';
import { request, showLoading, hideLoading } from 'remax/wechat';
import './index.scss';
import {APPC} from '../style';
import ProductCard from '../product-card';
import {login} from '@/lib/login';
import {SERVER_URL} from '@/env';

const CLASS_PREFIX = APPC+'-order-list';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const getData = React.useCallback(() => {
    setLoading(true);
    login().then((res: any) => {
      if(res.success){
        request({
          url: SERVER_URL+'/order/'+res.openid,
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res: any) {
            setData(res.data.result);
            setLoading(false);
          },
          fail(){
            setLoading(false);
          }
        })
      }
    })
  }, []);

  React.useEffect(() => {
    loading ? showLoading() : hideLoading();
  }, [loading]);

  usePageEvent('onShow', () => {
    getData();
  });
  React.useEffect(() => {
    
  }, []);

  React.useEffect(() => {
    if(selectedIds.length > 0 && disabled){
      setDisabled(false);
    }
    if(selectedIds.length === 0 && !disabled){
      setDisabled(true);
    }
  }, [JSON.stringify(selectedIds)]);

  const handleChange = (selecte: boolean, id: string) => {
    const _selectedIds = selectedIds.filter((_id) => _id !== id);
    if(selecte){
      setSelectedIds([..._selectedIds, id]);
    }else{
      setSelectedIds(_selectedIds);
    }
  }

  // const handleSubmit = () => {
  //   showLoading();
  //   setDisabled(true);
  //   request({
  //     url: 'http://localhost:3000/order/add',
  //     // url: SERVER_URL+'/order/add',
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     data: {
  //       ids: selectedIds.join(',')
  //     },
  //     success (res: any) {
  //       hideLoading();
  //       getData();
  //       navigateTo({url: '/pages/order-list/index'});
  //     },
  //     fail(){
  //       hideLoading();
  //     }
  //   })
  // }

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <View className={CLASS_PREFIX+'-container'}>
      {
        data.length === 0 && !loading ?
        <View className={CLASS_PREFIX+'-empty'}>
          空空如也
        </View>
        :
        <View className={CLASS_PREFIX+'-container'}>
          {
            data.map((item: any) => {
              return (
                <ProductCard
                  key={item.id}
                  data={item}
                  selected={selectedIds.includes(item.id)}
                  onTap={() => handleChange(!selectedIds.includes(item.id), item.id)}
                  order
                />
              )
            })
          }
        </View>
      }
        
      </View>
      {/* <View className={CLASS_PREFIX+'-footer'}>
        <Button disabled={disabled} className={CLASS_PREFIX+'-btn'}>删除</Button>
      </View> */}
    </View>
  );
};
