import React from 'react';
import Order from './order';

export default () => {

  React.useEffect(() => {
    document.title="订单信息";
  },[]);

  return (
    <Order/>
  )
}

export interface OrderType {
  id?: number
  name: string //客户姓名
  gender: number //性别 0-男 1-女
  mobile: string //后四位
  frameModel: string //型号
  cylMirrorRight: string //右眼柱镜
  prismRight: string //右眼棱镜
  axialRight: string //右眼棱镜轴向
  cylMirrorLeft: string //左眼柱镜
  prismLeft: string //左眼棱镜
  axialLeft: string //左眼棱镜轴向
  interpupillaryDistance: string //瞳距
  pointPupilRight: string //右眼点瞳
  pointPupilLeft: string //左眼点瞳
  remark: string //左眼点瞳
}