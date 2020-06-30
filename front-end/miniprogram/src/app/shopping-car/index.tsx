import React from 'react';
import { usePageEvent } from 'remax/macro';
import { View, Image, Button } from 'remax/one';
import { request, showToast, showLoading, hideLoading, navigateTo, switchTab, showModal } from 'remax/wechat';
import './index.scss';
import {APPC} from '../style';
import ProductCard from '../product-card';
import {login} from '@/lib/login';
import {SERVER_URL} from '@/env';
import {chooseAddress} from '@/lib/wechat';
import clsx from 'clsx';

const CLASS_PREFIX = APPC+'-shopping-car';

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
          url: SERVER_URL+'/shopping-car/'+res.openid,
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

  usePageEvent('onShow', () => {
    getData();
  });

  React.useEffect(() => {
    loading ? showLoading() : hideLoading();
  }, [loading]);

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

  const handleSubmit = async () => {
    const addressRes = await chooseAddress();
    console.log(addressRes);
    showLoading();
    setDisabled(true);
    request({
      url: SERVER_URL+'/order/add',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        ids: selectedIds.join(','),
        address: JSON.stringify(addressRes)
      },
      success (res: any) {
        hideLoading();
        getData();
        switchTab({url: '/pages/order-list/index'});
      },
      fail(){
        hideLoading();
      }
    })
  }

  const handleEdit = (id: number, userId: string) => {
    navigateTo({url: '/pages/shopping-car/edit/index?userId='+userId+'&id='+id});
  }

  const handleRemove = (id: number) => {
    showModal({
      title: '提示',
      content: '您确定将其从购物车中删除？',
      success (res) {
        if (res.confirm) {
          showLoading();
          request({
            url: SERVER_URL+'/shopping-car/remove',
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              id,
            },
            success (res: any) {
              getData();
            },
            complete(){
              hideLoading();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  const handleGetuserinfo = (e: any) => {
    console.log(e);
    showLoading();
    if(e.detail.userInfo){
      login().then((res: any) => {
        if(res.success){
          console.log(res.openid);
          request({
            url: SERVER_URL+'/user/getByOpenid/'+res.openid,
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res: any) {
              if(res.data.success && res.data.result[0]){
                const user = res.data.result[0];
                if(user.status === 'PASS'){
                  navigateTo({url: '/pages/custom/index'});
                }else if(user.status === 'REJECT'){
                  showModal({title: '很抱歉！您的账户审核未通过，无法使用', showCancel: false});
                }else{
                  showModal({title: '很抱歉！您的账户在审核中，待审核通过后方可使用', showCancel: false});
                }
              }
            },
            complete(){
              hideLoading();
            }
          })
        }else{
          //
          hideLoading();
        }
      })
    }
  }

  return (
    <View className={clsx(CLASS_PREFIX+'-root', {[CLASS_PREFIX+'-loading']: loading})}>
      {
        data.length === 0 ?
        <View className={CLASS_PREFIX+'-empty'}>
          <View>
            <View>您尚未添加任何定制信息</View>
            <View>可点击下方定制按钮进行定制</View>
            <View>
              <Button
                wechat-lang="zh_CN"
                wechat-open-type="getUserInfo"
                wechat-bindgetuserinfo={handleGetuserinfo}
              >
                定制
              </Button>
            </View>
          </View>
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
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                />
              )
            })
          }
        </View>
      }
      <View className={CLASS_PREFIX+'-footer'}>
        <Button disabled={disabled} className={CLASS_PREFIX+'-btn'} onTap={handleSubmit}>提交</Button>
      </View>
    </View>
  );
};
