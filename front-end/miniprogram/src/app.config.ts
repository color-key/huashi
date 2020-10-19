const pages = [
  'pages/index/index', 'pages/shopping-car/index', "pages/personal/index", "pages/custom/index", "pages/add-car-success/index",
  "pages/face3D/index", "pages/order-list/index", "pages/shopping-car/edit/index"
];
const color = '#FFFFFF';

import { AppConfig as WechatAppConfig } from 'remax/wechat';
import { AppConfig as AliAppConfig } from 'remax/ali';
import { AppConfig as ToutiaoAppConfig } from 'remax/toutiao';
import { AppConfig as WebAppConfig } from 'remax/web';

export const wechat: WechatAppConfig = {
  pages,
  tabBar: {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "主页",
      iconPath: "/static/tab-bar/home@2x.png",
      selectedIconPath: "/static/tab-bar/home@2x.png",
    },{
      "pagePath": "pages/shopping-car/index",
      "text": "购物车",
      iconPath: "/static/tab-bar/car@2x.png",
      selectedIconPath: "/static/tab-bar/car@2x.png",
    },{
      "pagePath": "pages/order-list/index",
      "text": "订单",
      iconPath: "/static/tab-bar/order@2x.png",
      selectedIconPath: "/static/tab-bar/order@2x.png",
    },{
      "pagePath": "pages/personal/index",
      "text": "我的",
      iconPath: "/static/tab-bar/mine@2x.png",
      selectedIconPath: "/static/tab-bar/mine@2x.png",
    }],
    backgroundColor: '#FFFFFF',
    color: '#000000',
    selectedColor: '#FFE015',
  },
  window: {
    navigationBarBackgroundColor: color,
    navigationBarTitleText: '眼镜定制',
    navigationBarTextStyle: 'black',
    // enablePullDownRefresh: true
  },
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  }
};

export const ali: AliAppConfig = {
  pages,
  window: {
    defaultTitle: 'Remax One Ali',
    titleBarColor: color,
  },
};

export const toutiao: ToutiaoAppConfig = {
  pages,
  window: {
    navigationBarTitleText: 'Remax One Toutiao',
    navigationBarBackgroundColor: color,
  },
};

export const web: WebAppConfig = {
  pages,
  title: 'Remax One Web',
};
