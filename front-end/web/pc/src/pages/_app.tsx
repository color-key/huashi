import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Provider from '@/app/provider';
import {PATH_PREFIX} from "@/env";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>天蕾企业服务有限公司</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="renderer" content="webkit"/>
        <link rel="manifest" href={`${PATH_PREFIX}/manifest.json`} />
        <link rel="icon" type="image/x-icon" href={`${PATH_PREFIX}/favicon.ico`} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="full-screen" content="yes"/>
        <meta name="x5-fullscreen" content="true"/>
        <meta content="telephone=no" name="format-detection" />
        <meta content="email=no" name="format-detection" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <script src={`${PATH_PREFIX}/lib/judge-terminal-equipment.js`}/>
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

