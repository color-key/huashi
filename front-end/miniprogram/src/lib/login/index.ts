import { checkSession, request, setStorageSync, getStorageSync, login as wxLogin, getUserInfo, showToast} from 'remax/wechat';
// import {getAuth} from '../auth';
import {SERVER_URL} from '@/env';

const serverLogin = () => {
  return new Promise((resolve) => {
    getUserInfo({
      lang: 'zh_CN',
      success(userInfoRes) {
        console.log(userInfoRes);
        wxLogin({
          timeout: 172800000,
          success(res){
            const code: any = res.code;
            request({
              url: SERVER_URL+'/login',
              method: 'POST',
              data: {
                code,
                userInfo: userInfoRes.userInfo
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                console.log(res.data)
                const data: any = res.data;
                setStorageSync('openid', data.result.openid)
                resolve({success: true, openid: data.result.openid});
              }
            })
          },
          fail(res){
    
          },
          complete(){
    
          }
        })
      }
    })
  })
}

const updUser = (openid: string) => {
  return new Promise((resolve) => {
    getUserInfo({
      lang: 'zh_CN',
      success(userInfoRes) {
        request({
          url: SERVER_URL+'/user/upd',
          method: 'POST',
          data: {
            ...userInfoRes.userInfo,
            openid
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            resolve({success: true});
          }
        })
      }
    })
  })
}

export const login = () => {
  return new Promise((resolve) => {
    // getAuth().then((authRes: any) => {
      // if(authRes['scope.userInfo']){
        checkSession({
          success(){
            console.log("登录未过期");
            const openid = getStorageSync("openid");
            if(openid){
              updUser(openid).then((updUserRes: any) => {
                if(updUserRes.success){
                  resolve({success: true, openid});
                }
              })
            }else{
              serverLogin().then(() => {
                resolve({success: true, openid: getStorageSync("openid")});
              })
            }
          },
          fail() {
            console.log("登录已过期");
            serverLogin().then(() => {
              console.log(getStorageSync("openid"));
              resolve({success: true, openid: getStorageSync("openid")});
            })
          }
        })
      // }else{
        // showToast({
        //   title: '须授权相关信息后才能正常使用',
        //   icon: 'none',
        //   duration: 10000
        // })
      // }
    // })
  })
};
