import {getSetting, authorize} from 'remax/wechat';

export const getAuth = () => {
  return new Promise((resolve) => {
    getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          authorize({
            scope: 'scope.userInfo',
            success () {
              resolve(res.authSetting);
            },
            fail(){
              console.log(res);
              resolve(res.authSetting);
            }
          })
        }
      }
    })
  })
}