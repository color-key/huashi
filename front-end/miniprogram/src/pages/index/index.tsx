import React from 'react';
import Layout from '@/app/layout';
import {Button} from 'remax/wechat';
import App from '@/app/home';
import {querySelectorClientRect} from '@/components/utils/querySelector';
import {createSelectorQuery} from 'remax/wechat';
// import App from '@/app/shopping-car';
// import App from '@/app/personal';
// import App from '@/app/order-list';
// import App from '@/app/custom';

export default () => {

  const handleGetuserinfo = (e: any) => {
    console.log(e);
  }

  React.useEffect(() => {
    const query = createSelectorQuery();
    query.select('#getUserInfo');
  }, []);

  return (
    <Layout footer>
      <App/>
    </Layout>
  );
};
