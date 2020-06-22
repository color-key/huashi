import React from 'react';
import { WebView, View } from 'remax/one';
import {login} from '@/lib/login';

export default () => {

  const [src, setSrc] = React.useState<string|null>(null);
  
  React.useEffect(() => {
    login().then((res: any) => {
      if(res.success){
        setSrc("https://huashi.faycz.com/m/face3D/?id="+res.openid);
      }else{
        //
      }
    })
  }, [])
  
  return (
    src ? <WebView src={src}/> : <View/>
  );
};
