const pages = [
  'pages/index/index', 'pages/shopping-car/index', "pages/personal/index", "pages/custom/index",
  "pages/face3D/index", "pages/order-list/index", "pages/address/index"
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
      "text": "首页",
      iconPath: "/static/tab-bar/home-outlined-80.png",
      selectedIconPath: "/static/tab-bar/home-80.png",
    },{
      "pagePath": "pages/shopping-car/index",
      "text": "购物车",
      iconPath: "/static/tab-bar/shopping-cart-outlined-80.png",
      selectedIconPath: "/static/tab-bar/shopping-cart-80.png",
    },{
      "pagePath": "pages/personal/index",
      "text": "我的",
      iconPath: "/static/tab-bar/person-outlined-80.png",
      selectedIconPath: "/static/tab-bar/person-80.png",
    }],
    backgroundColor: '#FFFFFF',
    color: '#000000',
    selectedColor: '#f50057',
  },
  window: {
    navigationBarBackgroundColor: color,
    navigationBarTitleText: '眼镜定制',
    navigationBarTextStyle: 'black'
  },
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
