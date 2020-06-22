import React from 'react';
import { WebView, View } from 'remax/one';
import {login} from '@/lib/login';
import {WEB_URL} from '@/env';

export default () => {

  const [src, setSrc] = React.useState<string|null>(null);
  
  React.useEffect(() => {
    login().then((res: any) => {
      if(res.success){
        setSrc(WEB_URL+"/face3D/?id="+res.openid);
      }else{
        //
      }
    })
  }, [])
  
  return (
    src ? <WebView src={src}/> : <View/>
  );
};
