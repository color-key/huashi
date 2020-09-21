import React from 'react';
import { View, Image, Button } from 'remax/one';
import { chooseImage, request, showToast, showLoading, hideLoading, navigateTo, showModal, uploadFile } from 'remax/wechat';
import './index.scss';
import {APPC} from '../style';
import Paper from '@/components/paper';
import {ORIGIN, SERVER_URL} from '@/env';
import clsx from 'clsx';
import {login} from '@/lib/login';

const CLASS_PREFIX = APPC+'-product-card';

export default ({data, selected=false, onTap, order=false, onEdit, onRemove}: any) => {

  const statusText: any = {
    'PENDING': '待审核',
    'PASS': '审核通过',
    'REJECT': '审核未通过',
    'SEND': '已发货',
  }

  const statusColor: any = {
    'PENDING': '#FD6868',
    'PASS': '#01C50B',
    'REJECT': '#FD6868',
    'SEND': '#01C50B',
  }

  const [upload, setUpload] = React.useState(false);

  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(data.id, data.wx_user_id);
  }

  const handleDelete = (e: any) => {
    e.stopPropagation();
    onRemove(data.id);
  }

  const handleUpload = () => {
    chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        showLoading({
          title: '上传中',
        });
        const tempFilePaths = res.tempFilePaths;
        const tempFilesSize = res.tempFiles[0].size;
        if(tempFilesSize <= 10000000){
          login().then((res: any) => {
            if(res.success){
              uploadFile({
                url: SERVER_URL+'/optometry-sheet/upload',
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                  'shoppingCarId': data.id,
                },
                success (res){
                  const data: any = JSON.parse(res.data);
                  if(data.success){
                    setUpload(true);
                    showToast({
                      title: "上传成功",
                      icon: "none"
                    })
                  }else{
                    showToast({
                      title: "上传失败，请重试",
                      icon: "none"
                    })
                  }
                },
                fail(){
                  showToast({
                    title: "上传失败，请重试",
                    icon: "none"
                  })
                },
                complete(){
                  hideLoading();
                }
              })
            }
          })
        }else{
          showToast({
            title: "请上传不大于10M的文件",
            icon: "none"
          })
        }
      }
    })
  }

  const address = data.address && JSON.parse(data.address);
  return (
    <View className={CLASS_PREFIX+'-root'} onTap={onTap}>
      {
        order &&
        <View className={CLASS_PREFIX+'-header'}>
          <View>订单编号：{data.order_no}</View>
          <View>{data.creation_datetime}</View>
        </View>
      }
      <View className={CLASS_PREFIX+'-container'}>
        <View className={CLASS_PREFIX+'-person'}>
          <Image mode={'aspectFit'} src={ORIGIN+"/face/"+data.id+"/face1"} className={CLASS_PREFIX+'-img'}/>
        </View>
        <View className={clsx(CLASS_PREFIX+'-eye', {[CLASS_PREFIX+'-eye-order']: order})}>
          <View>
            <View style={{display: 'flex'}}>
              {
                data.name.length>0 &&
                <View style={{marginRight: '20px'}}>{data.name.substr(0,1)}{data.gender===1?'女士':data.gender===0?'先生':''}</View>
              }
              <View>手机尾号：{data.mobile}</View>
            </View>
            {/* <View>型号：{data.frame_model}</View> */}
            <View className={CLASS_PREFIX+'-info'}>光度信息：</View>
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
        </View>
      </View>
      {
        order &&
        <View className={CLASS_PREFIX+'-status'}>
          <View style={{color: statusColor[data.status]}}>{statusText[data.status]}</View>
        </View>
      }
      {
        order && address &&
        <View className={CLASS_PREFIX+'-order'}>
          <View>订单信息：</View>
          {
            data.logistics_no && data.logistics_no.length>0 &&
            <View>
              快递单号：{data.logistics_no}
            </View>
          }
          <View className={CLASS_PREFIX+'-order-info'}>
            <View>姓名：{address.userName}</View>
            <View style={{marginLeft: '48px'}}>电话：{address.telNumber}</View>
          </View>
          <View className={CLASS_PREFIX+'-order-info'}>
            地址：
            {address.provinceName}{address.cityName}{address.countyName}{address.detailInfo}
          </View>
        </View>
      }
      {
        order ||
        
          <Image className={CLASS_PREFIX+'-check'} src={'/static/check/'+(selected?'checked':'check')+'.png'}/>
      }
      {
        order ||
        <View className={CLASS_PREFIX+'-btn-wrapper'}>
          <Button className={CLASS_PREFIX+'-btn'} onTap={handleEdit}>编辑</Button>
          <Button className={CLASS_PREFIX+'-btn'} onTap={handleUpload}>{(data.optometry_sheet||upload)?'已上传':'上传验光单'}</Button>
          <Button className={CLASS_PREFIX+'-btn'} onTap={handleDelete}>删除</Button>
        </View>
      }
    </View>
  );
};
