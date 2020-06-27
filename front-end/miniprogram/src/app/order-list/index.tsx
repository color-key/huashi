import React from 'react';
import { View } from 'remax/one';
import { usePageEvent } from 'remax/macro';
import { request, showLoading, hideLoading } from 'remax/wechat';
import './index.scss';
import {APPC} from '../style';
import ProductCard from '../product-card';
import {login} from '@/lib/login';
import {SERVER_URL} from '@/env';
import clsx from 'clsx';

const CLASS_PREFIX = APPC+'-order-list';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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

  return (
    <View className={clsx(CLASS_PREFIX+'-root', {[CLASS_PREFIX+'-loading']: loading})}>
      <View className={CLASS_PREFIX+'-container'}>
      {
        data.length === 0 ?
        <View className={CLASS_PREFIX+'-empty'}>
          您尚未从购物车中提交任何定制信息
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
    </View>
  );
};
