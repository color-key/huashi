import {getAuthAddress} from './auth';
import {chooseAddress as wxChooseAddress} from 'remax/wechat';

const chooseAddress = async () => {
  const res: any = await getAuthAddress();
  if(res['scope.address']){
    const addressRes = await wxChooseAddress();
    return addressRes;
  }else{
    wx.showToast({
      title: '请进入设置页面授予通讯地址信息'
    });
    return null;
  }
}

export {
  chooseAddress
}