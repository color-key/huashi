import React from 'react';
import { Order } from '../index.d';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { useTheme } from '@/components/theme';
import { getJson } from '@fay-react/lib/fetch';
import { getQueryString } from '@fay-react/lib/router';
import { BASE_SERVICE_URL } from "@/env";
import PayTime from '@/components/text/pay-time';

interface Props{
  data: Order
}

const PayStatus = ({order, onTimeout}: any) => {
  const theme = useTheme();
  console.log(order.remainingPayTime);
  switch (order.status) {
    case 'UnPaid':
      return <Box><Link component={"button"}>立即支付，剩余时间：<PayTime remainingTime={order.remainingPayTime} onTimeout={onTimeout}/></Link></Box>;
    case 'Paid':
      return <Box color={theme.colors.green} fontSize={'0.875rem'}><Link color={"inherit"} component={"button"} variant={"inherit"}>已完成</Link></Box>;
    case 'Fail':
      return <Box color={theme.colors.red} fontSize={'0.875rem'}><Link color={"inherit"} component={"button"} variant={"inherit"}>支付失败</Link></Box>;
    case 'Expired':
      return <Box color={theme.colors.deepGrey} fontSize={'0.875rem'}><Link color={"inherit"} component={"button"} variant={"inherit"}>订单失效</Link></Box>;
    default:
      return <>'----'</>
  }
}

export default ({data}: Props) => {

  const [order, setOrder] = React.useState(data);

  const getData = () => {
    getJson({ path: BASE_SERVICE_URL + `/order/detail/${getQueryString("id")}` }).then((res: any) => {
      if (res.status === 0) {
        setOrder(res.detail);
      }
    })
  }

  const handleTimeout = () => {
    getData();
  }
  return <PayStatus order={order} onTimeout={handleTimeout}/>
}