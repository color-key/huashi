import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@/components/theme";
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_SERVICE_URL, PATH_PREFIX } from "@/env";
import { Order } from '../index.d';
import moment from 'moment';
import {getQueryString} from '@fay-react/lib/router';
import Price from '@/components/text/price';
import ContractDrawer from './contract-drawer';
import PayTime from '@/components/text/pay-time';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(15, 6),
    display: "flex",
    justifyContent: "center"
  },
  content: {
    width: 1200
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title1: {
    marginBottom: theme.spacing(2)
  },
  title2: {
    marginBottom: theme.spacing(2),
    fontWeight: 500
  },
  divider: {
    margin: theme.spacing(6, 0)
  },
  desc: {
    fontSize: '0.875rem'
  },
  operate: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(3.5, 0, 6, 0)
  },
  payBtn: {
    width: 576
  },
  paper: {
    width: 576,
    backgroundColor: theme.palette.grey[100],
    margin: theme.spacing(2, 0, 6, 0),
    padding: theme.spacing(3)
  },
  paperLabel: {
    fontSize: '0.875rem',
    marginTop: theme.spacing(1)
  },
  unpaid: {
    color: theme.colors.orange,
    fontWeight: 500,
    fontSize: '1rem'
  },
  paid: {
    color: theme.colors.green,
    fontWeight: 500,
    fontSize: '1rem'
  },
  orderTime: {
    margin: theme.spacing(0, 0, 0, 4)
  }
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = React.useState<Order|null>(null);
  const [checked, setChecked] = React.useState(false);
  const [form, setForm] = React.useState('');

  const getData = () => {
    getJson({ path: BASE_SERVICE_URL + `/order/detail/${getQueryString("id")}` }).then((res: any) => {
      if (res.status === 0) {
        setData(res.detail);
      }else if(res.status === 100003){
        Router.replace(PATH_PREFIX+'/order/list');
      }
    })
  }

  React.useEffect(() => {
    getData();
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const payType = () => {
    switch (data!.status) {
      case 'Paid': {
        return <Typography variant={"inherit"} className={classes.paid}>已完成</Typography>;
      }
      case 'UnPaid': {
        return <Typography variant={"inherit"} >
          请在15分钟内完成支付：
          <Typography className={classes.unpaid} variant={"inherit"}>
            <PayTime remainingTime={data!.remainingPayTime} onTimeout={getData}/>
            {/* {handlePayTime(time)} */}
          </Typography>
        </Typography>;
      }
      case 'Fail': {
        return <Typography color={"secondary"}>支付失败</Typography>;
      }
      case 'Expired': {
        return <Typography color={"textSecondary"}>订单失效</Typography>;
      }
      default:
        return '-';
    }
  }

  const handlePay = () => {
    postJson({path: BASE_SERVICE_URL + '/order/alipayPayment/create/'+data?.orderId}).then(res => {
      if(res.status === 0){
        setForm(res.body);
      }
    })
  }

  React.useEffect(() => {
    if(form !== ''){
      const order = localStorage.getItem("order");
      let orderArr = [data!.orderId];
      if(order){
        orderArr = [...JSON.parse(order), data!.orderId];
      }
      localStorage.setItem("order", JSON.stringify(orderArr));
      document.forms[0].submit();
    }
  }, [form]);

  return (
    <div className={classes.root}>
      {
        data &&
        <div className={classes.content}>
          <div className={classes.title}>
            <div>
              <Typography variant={"h4"} className={classes.title1}>订单详情</Typography>
              <Typography variant={"inherit"}>订单号：{data.orderId}</Typography>
              <Typography variant={"inherit"} className={classes.orderTime}>订单发起时间：{moment(data.createdOn).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            </div>
            <div>
            <Typography variant={"h5"} className={classes.title2}>合计：<Price value={data.payAmount}/></Typography>
              {payType()}
            </div>
          </div>
          <Divider className={classes.divider} />
          {data.status === 'UnPaid' ? (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                    size={"small"}
                  />
                }
                label={<Typography variant={"inherit"} className={classes.desc}>我已阅读并同意接受<ContractDrawer text={'《'+data.productName+'合约》'}/></Typography>}
              />
              <div className={classes.operate}>
                <Button disabled={!checked} variant={"contained"} color={"primary"} className={classes.payBtn} disableElevation onClick={handlePay}>确认支付</Button>
                {/* <Button>取消订单</Button> */}
              </div>

            </>
          ) : null}
          <Typography variant={"h5"}>合约信息</Typography>
          <Paper variant={"outlined"} className={classes.paper}>
            <Typography variant={"h6"}>{data.productName}</Typography>
              <Typography className={classes.paperLabel}>挖矿币种：{data.product.miningCoinType}</Typography>
              <Typography className={classes.paperLabel}>合约期限：{data.product.productCycleDesc}</Typography>
              <Typography className={classes.paperLabel}>服务费：{data.product.serviceFeeDesc}</Typography>
              <Typography className={classes.paperLabel}>结算周期：T+{data.product.profitSettlementCycle}</Typography>
          </Paper>
          <Typography variant={"h5"}>算力信息</Typography>
          <Paper variant={"outlined"} className={classes.paper}>
              <Typography className={classes.paperLabel}>算力单价：<Price value={data.orderPricePerUnit}/>/TB</Typography>
            <Typography className={classes.paperLabel}>购买数量：{data.orderUnits} TB</Typography>
          </Paper>
          <Typography variant={"h5"}>支付方式</Typography>
          <Paper variant={"outlined"} className={classes.paper}>
            <img src={`${PATH_PREFIX}/pay/ali/standard.png`} width={100} />
          </Paper>
          <div dangerouslySetInnerHTML={{__html: form}}></div>
        </div>
      }
    </div>
  )
}