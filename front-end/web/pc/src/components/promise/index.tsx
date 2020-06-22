import React from 'react';
import { getJson } from '@fay-react/lib/fetch';
import CodeDialog from './code';
import { BASE_URL } from '@/env';

export default (({ auth = false, businessType, callback, cancel, userInfo }: any) => {
  const [userSettingInfo, setUserSettingInfo] = React.useState({
    bindMobile: false,
    mobileNo: null,
    mobileCountry: '',
    bindEmail: false,
    email: null,
    securityLevel: '',
    mfaMobileAuthenticate: false,
    mfaAuthenticator: false
  })
  const [values, setValues] = React.useState({
    dialogPhone: false,
    dialogEmail: false,
    dialogCode: false,
    dialogSinglCode: false,
    dialogMfa: false,
  })
  React.useEffect(() => {
    if (!auth) {
      setValues({ dialogPhone: false, dialogEmail: false, dialogCode: false, dialogSinglCode: false, dialogMfa: false })
      return;
    }
    if (userInfo) {
      setUserSettingInfo(userInfo);
      handleAuth(userInfo);
      return;
    }
    getJson({ path: BASE_URL + '/getUserSettingInfo' }).then(res => {
      if (res.status === 0) {
        setUserSettingInfo(res.userSettingInfo);
        handleAuth(res.userSettingInfo);
      }
    })
  }, [auth])

  const handleAuth = (info: any) => {
    if (!info?.mfaAuthenticator && !info?.mfaMobileAuthenticate) { // 未谷歌认证,未手机认证
      if (info?.bindMobile || info?.mobileNo) {
        setValues({ dialogPhone: true, dialogEmail: false, dialogCode: true, dialogSinglCode: false, dialogMfa: false })
        return
      }
      if (info?.bindEmail || info?.email) {
        setValues({ dialogPhone: false, dialogEmail: true, dialogCode: true, dialogSinglCode: false, dialogMfa: false })
        return
      }
    }
    if (info?.mfaAuthenticator && info?.mfaMobileAuthenticate) { // 全部已认证
      setValues({ dialogPhone: false, dialogEmail: false, dialogCode: false, dialogSinglCode: false, dialogMfa: true })
      return
    }
    if (info?.mfaAuthenticator) { // 谷歌认证
      setValues({ dialogPhone: false, dialogEmail: false, dialogCode: false, dialogSinglCode: true, dialogMfa: false })
      return
    }
    if (info?.mfaMobileAuthenticate) { // 手机认证
      setValues({ dialogPhone: true, dialogEmail: false, dialogCode: true, dialogSinglCode: false, dialogMfa: false })
      return
    }
  }

  const closeFuc = () => {
    setValues({ dialogPhone: false, dialogEmail: false, dialogCode: false, dialogSinglCode: false, dialogMfa: false })
    cancel && cancel()
  }
  const resultFuc = (e: any) => {
    callback && callback(e);
  }
  return (
    <>
      <CodeDialog open={auth && values.dialogCode} start={true} phone={values.dialogPhone} mobile={userSettingInfo.mobileNo} mobileCountry={userSettingInfo.mobileCountry} email={userSettingInfo.email} onClose={closeFuc} result={resultFuc} businessType={businessType} />
    </>
  )
})

/**
 * 权限校验
 * 1.手机校验
 * 2.邮箱校验
 * 3.谷歌校验码码校验
 * 4.手机校验码校验
 * 5.选择校验
 */