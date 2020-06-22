import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Provider from '@/app/provider';
import {PATH_PREFIX} from "@/env";

interface Props {
  Component: any
  pageProps: object
}

export default function MyApp(props: Props) {
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
        <title>眼镜定制</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="manifest" href={`${PATH_PREFIX}/manifest.json?v=1`} />
        <link rel="icon" type="image/x-icon" href={`${PATH_PREFIX}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${PATH_PREFIX}/static/pwa.png`}></link>
        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="full-screen" content="yes"/>
        <meta name="x5-fullscreen" content="true"/>
        <meta content="telephone=no" name="format-detection" />
        <meta content="email=no" name="format-detection" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        {/* <script src={`${PATH_PREFIX}/lib/judge-terminal-equipment.js`}/> */}
        <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
      </Head>
      <Provider>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

