import React from 'react';
import { WebView } from 'remax/one';
import {WEB_URL} from '@/env';

export default (props: any) => {
  const {userId, id} = props.location.query;
  return (
    <WebView src={WEB_URL+"/order/?userId="+userId+"&id="+id}/>
  );
};
