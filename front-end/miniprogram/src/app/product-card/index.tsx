import React from 'react';
import { View, Image, Button } from 'remax/one';
import './index.scss';
import {APPC} from '../style';
import Paper from '@/components/paper';
import {ORIGIN} from '@/env';
import clsx from 'clsx';

const CLASS_PREFIX = APPC+'-product-card';

export default ({data, selected=false, onTap, order=false, onEdit, onRemove}: any) => {

  const statusText: any = {
    'PENDING': '待审核',
    'PASS': '已审核',
    'REJECT': '审核未通过',
    'SEND': '已发货',
  }

  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(data.id, data.wx_user_id);
  }

  const handleDelete = (e: any) => {
    e.stopPropagation();
    onRemove(data.id);
  }

  const address = data.address && JSON.parse(data.address);
  return (
    <Paper className={CLASS_PREFIX+'-root'} onTap={onTap}>
      {
        order &&
        <View className={CLASS_PREFIX+'-header'}>
          <View>订单编号：{data.order_no}</View>
          <View>{data.creation_datetime}</View>
          <View>{statusText[data.status]}</View>
        </View>
      }
      
      <View className={CLASS_PREFIX+'-container'}>
        {
          order ||
          <View className={CLASS_PREFIX+'-left'}>
            <Image className={CLASS_PREFIX+'-check'} src={'/static/check/'+(selected?'checked':'check')+'.png'}/>
          </View>
        }
        <View className={CLASS_PREFIX+'-person'}>
          <Image src={ORIGIN+"/face/"+data.id+"/face1"} className={CLASS_PREFIX+'-img'}/>
        </View>
        <View className={clsx(CLASS_PREFIX+'-eye', {[CLASS_PREFIX+'-eye-order']: order})}>
          <View>
            <View>{data.name} {data.gender===1?'女士':data.gender===0?'先生':''} {data.mobile}</View>
            <View>型号：{data.frame_model}</View>
            <View>光度信息：</View>
            <View className={CLASS_PREFIX+'-info'}>
              <View>R: {data.cyl_mirror_right};</View>
              <View>{data.prism_right}/{data.axial_right}</View>
            </View>
            <View className={CLASS_PREFIX+'-info'}>
              <View>L: {data.cyl_mirror_left};</View>
              <View>{data.prism_left}/{data.axial_left}</View>
            </View>
            <View className={CLASS_PREFIX+'-info'}>
              <View>PD: {data.interpupillary_distance}</View>
              <View>VD: {data.point_pupil_right}/{data.point_pupil_left}</View>
            </View>
            
          </View>
          {
            order ||
            <View>
              <Button className={CLASS_PREFIX+'-btn'} onTap={handleEdit}>编辑</Button>
              <Button className={CLASS_PREFIX+'-btn'} onTap={handleDelete}>删除</Button>
            </View>
          }
          {
            order && address &&
            <View className={CLASS_PREFIX+'-address'}>
              {
                data.logistics_no && data.logistics_no.length>0 &&
                <View>
                  快递单号：{data.logistics_no}
                </View>
              }
              <View>
                {address.userName} {address.telNumber} {address.postalCode}
              </View>
              <View>
                {address.provinceName}{address.cityName}{address.countyName}{address.detailInfo}
                {address.provinceName}{address.cityName}{address.countyName}{address.detailInfo}
              </View>
            </View>
          }
        </View>
      </View>
    </Paper>
  );
};
