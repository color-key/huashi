import {getSetting, authorize} from 'remax/wechat';

export const getAuthLocation = () => {
  return new Promise((resolve) => {
    getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          authorize({
            scope: 'scope.userLocation',
            success () {
              resolve({['scope.userLocation']: true});
            },
            fail(){
              console.log(res);
              resolve({['scope.userLocation']: false});
            }
          })
        }else{
          resolve({['scope.userLocation']: true});
        }
      }
    })
  })
}

export const getAuthAddress = () => {
  return new Promise((resolve) => {
    getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          authorize({
            scope: 'scope.address',
            success () {
              resolve({['scope.address']: true});
            },
            fail(){
              console.log(res);
              resolve({['scope.address']: false});
            }
          })
        }else{
          resolve({['scope.address']: true});
        }
      }
    })
  })
}